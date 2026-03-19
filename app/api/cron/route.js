import { NextResponse } from "next/server";
import { createClient } from "../../lib/supabase/service_role";
import { handleSubscriptionApproved } from "../../lib/subscriptions/handleSubscriptionApproved";
import { notifySubscriptionAuthorized } from "../../lib/subscriptions/notifySubscriptionAuthorized";
import { handleSubscriptionActive } from "../../lib/subscriptions/handleSubscriptionAuthorized";
import { handleSubscriptionRejected } from "../../lib/subscriptions/handleSubscriptionRejected";
import { notifySubscriptionRejected } from "../../lib/subscriptions/notifySubscriptionRejected";
import { handleSubscriptionCancelled } from "../../lib/subscriptions/handleSubscriptionCancelled";
import { notifySubscriptionCancelled } from "../../lib/subscriptions/notifySubscriptionCancelled";
import dateToSpanish from "../../lib/dateToSpanish";

export async function POST(request) {
  let cronProcessed = true;
  let lastError = "";
  try {
    const supabase = createClient();
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      console.warn("Unauthorized access attempt to cron route");
      return NextResponse.json({ end: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await supabase
      .from("webhook_jobs")
      .select("*")
      .eq("status", "pending")
      .limit(10);

    if (error) {
      console.error("Error fetching pending events:", error);
      return NextResponse.json(
        { error: "Error fetching pending events" },
        { status: 500 },
      );
    }

    for (const job of data) {
      const { id, webhook_event_id, event_type, mp_event_id, attempts } = job;
      cronProcessed = true;

      // Aquí procesamos el evento de la tabla webhook_jobs según el tipo de evento
      if (event_type === "subscription_preapproval") {
        const response = await fetch(
          `https://api.mercadopago.com/preapproval/${mp_event_id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_TEST}`,
            },
          },
        );

        const subscription = await response.json();
        const userId = subscription.external_reference;

        if (subscription.status === "cancelled") {
          console.info(
            "El usuario con id: '",
            userId,
            "', ha cancelado su suscripción",
          );
          const subscriptionEnd = dateToSpanish(subscription.next_payment_date);
          const successUpdate = await handleSubscriptionCancelled(userId);
          if (successUpdate.success) {
            await notifySubscriptionCancelled({ userId, subscriptionEnd });
            cronProcessed = true;
          } else {
            cronProcessed = false;
            lastError = successUpdate.error;
          }
        }

        if (subscription.status === "authorized") {
          const currentPeriodEnd = subscription.next_payment_date;
          const subscriptionId = subscription.subscription_id;
          const dateCreated = subscription.date_created;

          const subscriptionResponse = await handleSubscriptionActive({
            webhook_event_id,
            userId,
            subscriptionId,
            dateCreated,
            currentPeriodEnd,
          });
          if (subscriptionResponse.success) {
            const dateSpanish = dateToSpanish(currentPeriodEnd);
            await notifySubscriptionAuthorized({ userId, dateSpanish });
            cronProcessed = true;
          } else {
            cronProcessed = false;
            lastError = subscriptionResponse.error;
          }
        }
      }

      if (event_type === "payment") {
        const payments = await fetch(
          `https://api.mercadopago.com/v1/payments/${mp_event_id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_TEST}`,
            },
          },
        );
        const payment = await payments.json();
        const paymentUserId = payment.external_reference;
        console.info("Status en el payment:", payment);

        if (payment.status === "approved") {
          console.info(
            "Pago del cliente: '",
            paymentUserId,
            "', esta : ",
            payment.status,
          );

          const userId = paymentUserId;
          const rawWebhook = payment;
          const successUpdate = await handleSubscriptionApproved({
            webhook_event_id,
            userId,
            rawWebhook,
          });
          if (successUpdate.success) cronProcessed = true;
        }

        if (payment.status === "rejected") {
          const userId = paymentUserId;
          console.info(
            "El pago del cliente:'",
            paymentUserId,
            "', ha sido rechazado",
          );
          const subscriptionResponse = await handleSubscriptionRejected({
            userId,
          });
          if (subscriptionResponse.success) {
            const subscriptionStatus = subscriptionResponse.message;
            await notifySubscriptionRejected({ userId, subscriptionStatus });
            cronProcessed = true;
          } else {
            cronProcessed = false;
            lastError = subscriptionResponse.error;
          }
        }
      }

      if (cronProcessed) {
        const { error: updateError } = await supabase
          .from("webhook_jobs")
          .update({ status: "processed" })
          .eq("id", id);
        if (updateError) {
          console.error(`Error updating job ${id} status:`, updateError);
          return NextResponse.json(
            { error: "Error al intentar actualizar status en webhook_jobs" },
            { status: 500 },
          );
        }
      } else {
        const { error: updateError } = await supabase
          .from("webhook_jobs")
          .update({
            status: "pending",
            attempts: attempts + 1,
            last_error: lastError,
          })
          .eq("id", id);
        if (updateError) {
          console.error(`Error updating job ${id} status:`, updateError);
          return NextResponse.json(
            { error: "Error al intentar actualizar status en webhook_jobs" },
            { status: 500 },
          );
        }
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "Unexpected error, se interrumpió el proceso del cron por este error grave:",
      err,
    );
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

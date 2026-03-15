import { NextResponse } from "next/server";
import { createClient } from "../../lib/supabase/service_role";
/*import { handleSubscriptionApproved } from "../../lib/subscriptions/handleSubscriptionApproved";
import { notifySubscriptionAuthorized } from "../../lib/subscriptions/notifySubscriptionAuthorized";
import { handleSubscriptionActive } from "../../lib/subscriptions/handleSubscriptionAuthorized";*/
import { handleSubscriptionRejected } from "../../lib/subscriptions/handleSubscriptionRejected";
import { notifySubscriptionRejected } from "../../lib/subscriptions/notifySubscriptionRejected";
import { handleSubscriptionCancelled } from "../../lib/subscriptions/handleSubscriptionCancelled";
import { notifySubscriptionCancelled } from "../../lib/subscriptions/notifySubscriptionCancelled";
import dateToSpanish from "../../lib/dateToSpanish";

export async function POST(request) {
  try {
    const supabase = createClient();
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
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
      const { id, event_type, mp_event_id } = job;

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
          await handleSubscriptionCancelled(userId);
          await notifySubscriptionCancelled({ userId, subscriptionEnd });
        }

        if (subscription.status === "authorized") {
          const currentPeriodEnd = subscription.next_payment_date;
          const subscriptionId = subscription.subscription_id;
          const dateCreated = subscription.date_created;

          await handleSubscriptionActive({
            userId,
            subscriptionId,
            dateCreated,
            currentPeriodEnd,
          });
          const dateSpanish = dateToSpanish(currentPeriodEnd);
          await notifySubscriptionAuthorized({ userId, dateSpanish });
          console.info(
            "La suscipcion del usuario:",
            userId,
            ", ya está activa y vence el: ",
            dateSpanish,
          );
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
        console.info("Status en el payment:", payment.status);

        if (payment.status === "approved") {
          console.info(
            "Pago del cliente: '",
            paymentUserId,
            "', esta : ",
            payment.status,
          );

          const userId = paymentUserId;
          const rawWebhook = payment;
          await handleSubscriptionApproved({
            userId,
            rawWebhook,
          });
        }

        if (payment.status === "rejected") {
          const userId = paymentUserId;
          const subscriptionId = mp_event_id;
          console.info(
            "El pago del cliente:'",
            paymentUserId,
            "', ha sido rechazado",
          );
          const subscriptionStatus = await handleSubscriptionRejected({
            userId,
            subscriptionId,
          });
          await notifySubscriptionRejected({ userId, subscriptionStatus });
        }
      }

      const { error: updateError } = await supabase
        .from("webhook_jobs")
        .update({ status: "processed" })
        .eq("id", id);

      if (updateError) {
        console.error(`Error updating job ${id} status:`, updateError);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

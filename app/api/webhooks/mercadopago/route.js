import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { handleSubscriptionApproved } from "../../../lib/subscriptions/handleSubscriptionApproved";
import { notifySubscriptionAuthorized } from "../../../lib/subscriptions/notifySubscriptionAuthorized";
import { handleSubscriptionActive } from "../../../lib/subscriptions/handleSubscriptionAuthorized";
import { handleSubscriptionRejected } from "../../../lib/subscriptions/handleSubscriptionRejected";
import { notifySubscriptionRejected } from "../../../lib/subscriptions/notifySubscriptionRejected";
import { handleSubscriptionCancelled } from "../../../lib/subscriptions/handleSubscriptionCancelled";
import { notifySubscriptionCancelled } from "../../../lib/subscriptions/notifySubscriptionCancelled";
import dateToSpanish from "../../../lib/dateToSpanish";

export async function POST(request) {
  try {
    const signature = request.headers.get("x-signature");
    const requestId = request.headers.get("x-request-id");
    const body = await request.json();

    if (!signature || !requestId) {
      return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    const parts = signature.split(",");
    let ts;
    let xSignature;

    parts.forEach((part) => {
      const [key, value] = part.split("=");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          xSignature = trimmedValue;
        }
      }
    });

    const manifiest = `id:${body.data.id};request-id:${requestId};ts:${ts};`;

    const hash = createHmac("sha256", process.env.MP_SECRET_KEY_TEST)
      .update(manifiest)
      .digest("hex");

    if (hash !== xSignature) {
      console.log("Error de hash :", hash, ", xSignature:", xSignature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Aquí procesamos el webhook según el tipo de evento

    if (body.type === "subscription_preapproval") {
      const response = await fetch(
        `https://api.mercadopago.com/preapproval/${body.data.id}`,
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
        const id = body.id;

        await handleSubscriptionActive({
          id,
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

    if (body.type === "payment") {
      const payments = await fetch(
        `https://api.mercadopago.com/v1/payments/${body.data.id}`,
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
        const rawWebhook = body;
        const id = body.id;
        await handleSubscriptionApproved({
          id,
          userId,
          rawWebhook,
        });
      }

      if (payment.status === "rejected") {
        const id = body.id;
        const userId = paymentUserId;
        const subscriptionId = body.data.id;
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

    return NextResponse.json({ message: "Webhook recibido" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Iternal error, description: ${error}` },
      { status: 500 },
    );
  }
}

/*
webhook type = "subscription_preapproval"
        preapproval status = 'authorized'
               Se actualizan los datos de la suscripcion y se envia mail de pago exitoso con la fecha de vencimiento.

        preapproval status = 'cancelled'
               Se hace un update de canceledAtPeriodEnd a true y se envia un mail al usuario avisando que ha cancelado 
               la suscrición y puede seguir usando la app hasta el dia de vencimiento(currentPeriodEnd)       

webhook type = "payment"
        payment status = 'rejected'
               Se notifica al ususario que no se efectuo el pago de la suscripcion y que durante 5 días  se iba a seguir
               intentado el cobro, pasado ese tiempo 






*/

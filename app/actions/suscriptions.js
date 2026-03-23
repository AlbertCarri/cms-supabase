"use server";

import { MercadoPagoConfig, PreApproval } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function getSuscriptionUrl({ userId, email }) {
  const preApproval = new PreApproval(mercadopago);
  const newSubscriber = await preApproval.create({
    body: {
      payer_email: email,
      external_reference: userId,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 100,
        currency_id: "ARS",
      },
      reason: "Suscripcion a TuResto",
      status: "pending",
      back_url: "https://turesto.edelbyte.com.ar/suscriptions",
    },
  });
  return newSubscriber.init_point;
}


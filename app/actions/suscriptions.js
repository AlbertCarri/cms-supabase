"use server";

import { MercadoPagoConfig, PreApproval } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_TEST,
});

export async function getSuscriptionUrl({ userId, email }) {
  const preApproval = new PreApproval(mercadopago);
  const newSubscriber = await preApproval.create({
    body: {
      payer_email: "test_user_1758963997661611817@testuser.com",
      external_reference: userId,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 5000,
        currency_id: "ARS",
      },
      reason: "Suscripcion a CMS usando NGROK",
      status: "pending",
      back_url: "https://raina-unmoody-trula.ngrok-free.dev/suscriptions",
    },
  });
  return newSubscriber.init_point;
}


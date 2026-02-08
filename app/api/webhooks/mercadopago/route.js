import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log("Webhook:", body);

  return NextResponse.json({ message: "Webhook recibido" }, { status: 200 });
}

/*import { NextRequest, NextResponse, userAgent } from "next/server";
import { MercadoPagoConfig, PreApproval } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
const preapproval = new PreApproval(client);

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Webhook recibido:", body);

    if (
      body.type === "subscription_preapproval" ||
      body.type === "subscription_authorized_payment"
    ) {
      const preapprovalId = body.data?.id;

      if (preapprovalId) {
        const suscription = await preapproval.get({ id: preapprovalId });
        console.log("Suscription:", suscription);

        const userId = suscription.external_reference;
        const status = suscription.status;

        if (status === "authorized") {
          await activateSuscriptionBd(userId, preapprovalId);
          console.log(`Usuario ${userId} suscripción activada`);
        } else if (status === "cancelled" || status === "paused") {
          await deactivateSuscription(userId);
          console.log(`❌ Usuario ${userId} suscripción ${status}`);
        }
      }
    }
    return NextResponse.json({ recived: true });
  } catch (error) {
    console.error("Error en Webhook:", error);
    return NextResponse.json(
      { error: "Error procesando webhook" },
      { status: 200 },
    );
  }
}

async function activateSuscriptionBd(userId, mpsuscriptionId) {
  //// actualizar datos en supabase
  console.log(`Se activó la suscripción ${userId}`);
}

async function deactivateSuscription(userId) {
  //// cancelar suscripcion
  console.log(`Suscripcion cancelada para el usuario ${userId}`);
}*/

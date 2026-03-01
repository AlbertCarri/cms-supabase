import { createClient } from "../supabase/service_role";

export async function handleSubscriptionRejected({ userId, subscriptionId }) {
  const supabase = createClient();

  const { data: mpPeriod, error: badResponse } = await supabase
    .from("users")
    .select("currentPeriodEnd, mpGracePeriodEnd")
    .eq("user_id", userId);

  if (badResponse) {
    console.error("Error al leer el período de final de suscripción");
    return;
  }

  if (mpPeriod.currentPeriodEnd === "2026-01-01") {
    return "pending";
  }

  if (mpPeriod.mpGracePeriodEnd === null) {
    const periodEnd = mpPeriod.currentPeriodEnd;
    const [year, month, day] = periodEnd.split("-").map(Number);
    const time = new Date(year, month - 1, day);

    const gracePeriod = new Date(time);
    gracePeriod.setDate(gracePeriod.getDate() + 5);

    const { error } = await supabase
      .from("users")
      .update({
        subscription: "past_due",
        mpGracePeriodEnd: gracePeriod.toLocaleDateString("sv"),
      })
      .eq("user_id", userId);

    if (error)
      console.log("Error al tratar de actualizar la base de datos: ", error);

    console.log("Base de datos actualizada con past_due");
    return "past_due";
  }

  const expiration = Date.now() > new Date(mpPeriod.mpGracePeriodEnd);

  if (expiration) {
    const response = await fetch(
      `https://api.mercadopago.com/preapproval/${subscriptionId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_TEST}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      },
    );
    if (!response.ok) {
      const error = await response.text();
      console.log(`Error cancelado suscripción MP: ${error}`);
      return "cancelled";
    }
  }
  return "";
}

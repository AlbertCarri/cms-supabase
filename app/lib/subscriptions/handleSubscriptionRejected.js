import { createClient } from "../supabase/service_role";

export async function handleSubscriptionRejected({ userId, subscriptionId }) {
  const supabase = createClient();

  const { data: mpPeriod, error: badResponse } = await supabase
    .from("users")
    .select("current_period_end, grace_period_end")
    .eq("user_id", userId);

  if (badResponse) {
    console.error("Error al leer el período de final de suscripción");
    return;
  }

  if (mpPeriod.current_period_end === null) {
    return "pending";
  }

  if (mpPeriod.grace_period_end === null) {
    const gracePeriod = new Date(mpPeriod.current_period_end);
    gracePeriod.setDate(gracePeriod.getDate() + 5);

    const { error } = await supabase
      .from("users")
      .update({
        subscription_status: "past_due",
        grace_period_end: gracePeriod,
      })
      .eq("user_id", userId);

    if (error)
      console.error("Error al tratar de actualizar la base de datos: ", error);

    console.log("Base de datos actualizada con past_due");
    return "past_due";
  }

  const expiration = Date.now() > new Date(mpPeriod.grace_period_end);

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

import { createClient } from "../supabase/service_role";

export async function handleSubscriptionActive({
  id,
  userId,
  subscriptionId,
  dateCreated,
  currentPeriodEnd,
}) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({
        plan: "Pro",
        webhook_id: id,
        subscription_status: "active",
        mp_subscription_id: subscriptionId,
        current_period_end: currentPeriodEnd,
        created_at: dateCreated,
        cancel_at_period_end: false,
        grace_period_end: null,
      })
      .eq("user_id", userId)

    if (error) {
      console.error("Error al cargar 'activo' en base de datos:", error);
    }
    return;
  } catch (error) {
    console.error("Error al cargar 'activo' en base de datos:", error);
  }
}

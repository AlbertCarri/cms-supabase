import { createClient } from "../supabase/service_role";

export async function handleSubscriptionActive({
  webhook_event_id,
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
        webhook_id: webhook_event_id,
        subscription_status: "active",
        mp_subscription_id: subscriptionId,
        current_period_end: currentPeriodEnd,
        created_at: dateCreated,
        cancel_at_period_end: false,
        grace_period_end: null,
      })
      .eq("user_id", userId)
      .neq("subscription_status", "active");

    if (error) {
      console.error("Error al cargar 'activo' en base de datos:", error);
      return { success: false, error: error };
    }
    return { success: true };
  } catch (err) {
    console.error("Error al cargar 'activo' en base de datos:", err);
    throw err;
  }
}

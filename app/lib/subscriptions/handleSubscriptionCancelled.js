import { createClient } from "../supabase/service_role";

export async function handleSubscriptionCancelled(userId) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("users")
      .update({ canceledAtPeriodEnd: true })
      .eq("user_id", userId);

    console.log("canceledAtPeriodEnd cambiada a TRUE");
  } catch (error) {
    console.log("Error al cambiar canceledAtPeriodEnd to TRUE, error:", error);
  }
}

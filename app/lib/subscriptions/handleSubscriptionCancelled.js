import { createClient } from "../supabase/service_role";

export async function handleSubscriptionCancelled(userId) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({ cancel_at_period_end: true })
      .eq("user_id", userId);

    if (error) {
      console.error(
        "Error al cambiar cancel_at_period_end to TRUE, error:",
        error,
      );
      return;
    }
    console.log("cancel_at_period_end cambiada a TRUE");
    return;
  } catch (error) {
    console.error("Error al cambiar cancel_at_period_end to TRUE, error:", error);
  }
}

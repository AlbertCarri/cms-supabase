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
      return { success: false, error: error };
    }

    console.info("cancel_at_period_end cambiada a TRUE");
    return { success: true };
  } catch (err) {
    console.error("Error al cambiar cancel_at_period_end to TRUE, error:", err);
    throw err;
  }
}

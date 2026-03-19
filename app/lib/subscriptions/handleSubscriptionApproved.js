import { createClient } from "../supabase/service_role";

export async function handleSubscriptionApproved({
  webhook_event_id,
  userId,
  rawWebhook,
}) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({
        raw_webhook: rawWebhook,
      })
      .eq("user_id", userId);

    if (error) {
      console.error("Error al actualizar usuario en base de datos:", error);
      return { success: false, error: error.message };
    }
    console.log(
      `Usuario ${userId} actualizado con webhook_id ${webhook_event_id}`,
    );
    return { success: true };
  } catch (err) {
    console.error("Error al cargar aprobado en base de datos:", err);
    throw err;
  }
}

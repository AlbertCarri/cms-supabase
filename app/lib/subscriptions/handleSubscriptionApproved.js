import { createClient } from "../supabase/service_role";

export async function handleSubscriptionApproved({ id, userId, rawWebhook }) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({
        webhook_id: id,
        raw_webhook: rawWebhook,
      })
      .eq("user_id", userId)
      .neq("webhook_id", id); // Solo actualiza si el webhook_id es diferente

    if (error) {
      console.error("Error al actualizar usuario en base de datos:", error);
    } else {
      console.log(`Usuario ${userId} actualizado con webhook_id ${id}`);
    }
  } catch (error) {
    console.error("Error al cargar aprobado en base de datos:", error);
  }
}

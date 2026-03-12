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
      .neq("webhook_id", id);
  } catch (error) {
    console.log("Error al cargar aprobado en base de datos:", error);
  }
}

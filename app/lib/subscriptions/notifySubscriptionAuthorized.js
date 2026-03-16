import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailAuthorizedTemplate } from "./buildMailAuthorizedTemplate";
import { createClient } from "../supabase/service_role";

export async function notifySubscriptionAuthorized({ userId, dateSpanish }) {
  const supabase = createClient();
  const to = await getUserData(userId);
  if (!to) return;

  const { data: alreadySent } = await supabase
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("email_type", "activation")
    .maybeSingle();

  if (alreadySent) {
    console.log(
      `Email de activación ya enviado al usuario ${userId}, no se enviará nuevamente.`,
    );
    return { success: false, error: "Email de activación ya enviado" };
  }

  const { subject, html } = buildMailAuthorizedTemplate(dateSpanish);

  const response = await sendEmail({
    from: "TuResto <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });

  if (!response.success) {
    console.error(
      "Error al enviar email de suscripción autorizada:",
      response.error,
    );
  }

  const { error } = await supabase.from("email_logs").insert({
    user_id: userId,
    email_type: "activation",
    sent_at: new Date(),
  });

  return response;
}

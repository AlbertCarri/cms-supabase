import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailCancelledTemplete } from "./buildMailCancelledTemplate";
import { createClient } from "../supabase/service_role";

export async function notifySubscriptionCancelled({ userId, subscriptionEnd }) {
  const supabase = createClient();
  const to = await getUserData(userId);
  if (!to) return;

  const { data: alreadySent } = await supabase
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("email_type", "cancelled_user")
    .maybeSingle();

  if (alreadySent) {
    console.log(
      `Email de cancelación ya enviado al usuario ${userId}, no se enviará nuevamente.`,
    );
    return { success: false, error: "Email de activación ya enviado" };
  }

  const { subject, html } = buildMailCancelledTemplete(subscriptionEnd);

  const response = await sendEmail({
    from: "TuResto <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });
  if (!response.success) {
    console.error(
      "Error al enviar el email de cancelación al usuario: ",
      userId,
      ", error:",
      response.error,
    );
  }

  const { error } = await supabase.from("email_logs").insert({
    user_id: userId,
    email_type: "cancelled_user",
    sent_at: new Date(),
  });

  return response;
}

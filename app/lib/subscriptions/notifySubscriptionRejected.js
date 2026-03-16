import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailRejectedTemplate } from "./buildMailRejectedTemplate";

export async function notifySubscriptionRejected({
  userId,
  subscriptionStatus,
}) {
  const to = await getUserData(userId);
  if (!to || subscriptionStatus === "") return;

  const { data: alreadySent } = await supabase
    .from("email_logs")
    .select("id")
    .eq("user_id", userId)
    .eq("email_type", subscriptionStatus)
    .maybeSingle();

  if (alreadySent) {
    console.info(`Email de rejected ya enviado al usuario ${userId}`);
    return { success: false, error: "Email de activación ya enviado" };
  }

  const { subject, html } = buildMailRejectedTemplate(subscriptionStatus);

  const response = await sendEmail({
    from: "TuRestó <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });
  const { error } = await supabase.from("email_logs").insert({
    user_id: userId,
    email_type: subscriptionStatus,
    sent_at: new Date(),
  });
  return response;
}

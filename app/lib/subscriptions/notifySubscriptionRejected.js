import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailRejectedTemplate } from "./buildMailRejectedTemplate";

export async function notifySubscriptionRejected({
  userId,
  subscriptionStatus,
}) {
  const to = await getUserData(userId);
  if (!to || subscriptionStatus === "") return;

  const { subject, html } = buildMailRejectedTemplate(subscriptionStatus);

  const response = await sendEmail({
    from: "TuRestó <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });
  return response;
}

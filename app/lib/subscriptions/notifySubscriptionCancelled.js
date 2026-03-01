import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailCancelledTemplete } from "./buildMailCancelledTemplate";

export async function notifySubscriptionCancelled({ userId, subscriptionEnd }) {
  const to = await getUserData(userId);
  if (!to) return;

  const { subject, html } = buildMailCancelledTemplete(subscriptionEnd);

  const response = await sendEmail({
    from: "TuResto <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });
  return response;
}

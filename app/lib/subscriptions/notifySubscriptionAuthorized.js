import { getUserData } from "../supabase/getUserData";
import { sendEmail } from "../resend/sendEmail";
import { buildMailAuthorizedTemplate } from "./buildMailAuthorizedTemplate";

export async function notifySubscriptionAuthorized({ userId, dateSpanish }) {
  console.log("notify : userId y dateSpanish", userId, dateSpanish);
  const to = await getUserData(userId);
  if (!to) return;

  const { subject, html } = buildMailAuthorizedTemplate(dateSpanish);

  const response = await sendEmail({
    from: "TuResto <noreply@edelbyte.com.ar>",
    to,
    subject,
    html,
  });
  return response;
}

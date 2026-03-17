import { sendEmail } from "../resend/sendEmail";
import { buildMailBlockedTemplate } from "./buildMailBlockedTemplate";

export async function notifySubscriptionBlocked(email, resto) {
  const to = email;
  const { subject, html } = buildMailBlockedTemplate(resto);

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
  return
}

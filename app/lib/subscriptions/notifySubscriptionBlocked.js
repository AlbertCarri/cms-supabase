import { sendEmail } from "../resend/sendEmail";
import { buildMailBlockedTemplate } from "./buildMailBlockedTemplate";

export async function notifySubscriptionBlocked({ email, resto }) {
  try {
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
      return { success: false, error: response.error };
    }
    return;
  } catch (err) {
    console.error(
      "Error al intentar enviar el email de blocked. Detalles:",
      err,
    );
    return { success: false, error: err };
  }
}

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ from, to, subject, html }) {
  try {
    const response = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Mail enviado con éxito a:");
    return { success: true, id: response };
  } catch (error) {
    console.error("Envio de mail fallido, error:", error);
    return { success: false, error };
  }
}

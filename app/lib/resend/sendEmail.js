import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ from, to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    if (error) {
      console.error("Error en api resend, error:", error);
      return { success: false, error: error.message };
    }
    console.info("Mail enviado con éxito");
    return { success: true, id: data.id };
  } catch (error) {
    console.error("Envio de mail fallido, error:", error);
    return { success: false, error };
  }
}

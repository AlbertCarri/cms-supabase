"use server";

import { sendEmail } from "../lib/resend/sendEmail";

export async function sendForm(prevData, formData) {
  const to = "ae_carrizo@hotmail.com";
  const name = formData.get("name");
  const email = formData.get("email");
  const text = formData.get("text");
  const html = `
  <h2>Consulta desde app TuRestó</h2>
  <p>Recibiste una consulta de ${name}</p>
  <p>Su email: ${email}</p>
  <p>Consulta:</p>
  <p>${text}</p>
  `;
  try {
    await sendEmail({
      to,
      from: "TuRestó <info@edelbyte.com.ar>",
      subject: "Consulta de app TuResto",
      html,
    });
    console.log(
      "Mail enviado correctamente a:",
      name,
      "email:",
      email,
      "texto",
      text,
    );
  } catch (error) {
    console.error("Se produjo un error al enviar la consulta. ERROR : ", error);
  }
}

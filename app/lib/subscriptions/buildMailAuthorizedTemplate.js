export function buildMailAuthorizedTemplate(dateSpanish) {
  return {
    subject: "Suscripción activa a TuRestó",
    html: `
        <h1>Gracias por suscribirte!</h1>
        <p>Tu plan mensual está activo para TuRestó y vence el ${dateSpanish}</p>
         `,
  };
}

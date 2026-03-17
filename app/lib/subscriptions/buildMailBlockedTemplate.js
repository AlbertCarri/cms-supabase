export function buildMailBlockedTemplate(resto) {
  return {
    subject: "Suscripción bloqueada - TuRestó",
    html: `
        <h1>Lamentablemente, la suscripción de ${resto} ha sido bloqueada</h1>
        <p>Para poder ser utilizada nuevamente, haz clic en el botón de renovación</p>
         `,
  };
}
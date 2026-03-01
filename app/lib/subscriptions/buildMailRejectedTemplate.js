export function buildMailRejectedTemplate(subscriptionStatus) {
  if (subscriptionStatus === "pending") {
    return {
      subject: "Pago de suscripción de TuRestó pendiente de pago",
      html: `
      <h1>Pago pendiente</h1>
      <p>El pago de su plan mensual esta pendiende</p>
      `,
    };
  }
  if (subscriptionStatus === "past_due") {
    return {
      subject: "Renovación de suscripción de TuRestó rechazada",
      html: `
      <h1>Problemas con el pago de la renovación de su plan</h1>
      <p>MercadoPago no puedo realizar el cobro de su suscripción mensual</p>
      <p>Su plan seguirá activo durante 5 días mientras Mercado Pago reintenta 
      el cobro automaticamente.</P>
      <P>Pasados esos 5 días el plan se cancelará</p> 
      `,
    };
  }
}

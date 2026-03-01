export function buildMailCancelledTemplete(subscriptionEnd){
    return{
        subject:"Tu suscripción a TuRestó fue cancelada",
        html:`
        <h1>Suscripción cancelada</h1>
        <p>La renovación de tu suscrpción mensual ha sido cancelada</P>
        <p>Pero no te preocupes, todavía podes usarla hasta el ${subscriptionEnd}</p>
        `
    }
}
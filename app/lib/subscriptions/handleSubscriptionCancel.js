export async function handleSubscriptionCancel({ subscriptionId }) {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/preapproval/${subscriptionId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN_TEST}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      },
    );
    if (!response.ok) {
      const error = await response.text();
      console.error(`Error cancelando suscripción MP: ${error}`);
    }
    return;
  } catch (error) {
    console.error(`Error cancelando suscripción MP: ${error}`);
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

  const planData = {
    reason: "Suscripción Test (Creada desde Nextjs)",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 100, // Monto a cobrar
      currency_id: "ARS"
    },
    back_url: "https://www.google.com", // URL a donde vuelve el usuario
    status: "active"
  };

  try {
    const response = await fetch("https://api.mercadopago.com/preapproval_plan", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(planData)
    });

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
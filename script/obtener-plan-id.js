const accessToken = "TEST-4171130247521915-052020-4f930e63073f0cbfa824078699063360-8349632"

async function obtenerPlanes() {
  try {
    const response = await fetch('https://api.mercadopago.com/preapproval_plan/search', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    console.log("\n📋 Planes encontrados:", data.results?.length || 0);
    
    if (data.results && data.results.length > 0) {
      data.results.forEach((plan, index) => {
        console.log(`\n--- Plan ${index + 1} ---`);
        console.log("Nombre:", plan.reason);
        console.log("✅ ESTE ES EL ID:", plan.id);
        console.log("Precio:", plan.auto_recurring?.transaction_amount);
        console.log("Estado:", plan.status);
      });
    } else {
      console.log("\n⚠️ No se encontraron planes");
      console.log("Respuesta completa:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

obtenerPlanes();

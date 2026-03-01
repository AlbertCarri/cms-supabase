import { createClient } from "../supabase/service_role";

export async function handleSubscriptionApproved({
  userId,
  mpTransactionData,
  mpPaymentPayer,
  mpPaymentMethod,
}) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("users")
      .update({
        mpTransactionData: mpTransactionData,
        mpPaymentPayer: mpPaymentPayer,
        mpPaymentMethod: mpPaymentMethod,
      })
      .eq("user_id", userId);
  } catch (error) {
    console.log("Error al cargar aprobado en base de datos:", error);
  }
}

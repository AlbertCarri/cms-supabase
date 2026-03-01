import { createClient } from "../supabase/service_role";

export async function handleSubscriptionActive({
  userId,
  subscriptionId,
  subscriptionStatus,
  currentPeriodEnd,
}) {
  try {
    const supabase = createClient();

    const { data } = await supabase
      .from("users")
      .update({
        plan: "Pro",
        subscriptionStatus: subscriptionStatus,
        mpSubscriptionId: subscriptionId,
        currentPeriodEnd: currentPeriodEnd,
        canceledAtPeriodEnd: false,
        mpGracePeriodEnd: null,
      })
      .eq("user_id", userId);
    return data;
  } catch (error) {
    console.log("Error al cargar aprobado en base de datos:", error);
  }
}

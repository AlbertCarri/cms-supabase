import { handleSubscriptionCancel } from "./handleSubscriptionCancel";

export default async function getAccessLevel(users) {
  const subscriptionId = users.mp_subscription_id;
  const subscriptionStatus = users.subscription_status;
  const graceExpired = Date.now() > new Date(users.grace_period_end).getTime();
  const subscriptionExpired =
    Date.now() > new Date(users.current_period_end).getTime();

  if (subscriptionStatus === "inactive") return "inactive";

  if (
    (subscriptionStatus === "past_due" && graceExpired) ||
    subscriptionStatus === "cancelled"
  ) {
    await handleSubscriptionCancel({ subscriptionId });
    return "blocked";
  }
  if (users.cancel_at_period_end && subscriptionExpired) {
    await handleSubscriptionCancel({ subscriptionId });
    return "blocked";
  }

  if (subscriptionStatus === "active") {
    return "full";
  }

  return "grace";
}

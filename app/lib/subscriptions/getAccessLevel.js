import { handleSubscriptionCancel } from "./handleSubscriptionCancel";

export default async function getAccessLevel(users) {
  const subscriptionId = users.mp_subscription_id;
  const subscriptionStatus = users.subscription_status;
  const graceExpired = Date.now() > new Date(users.grace_period_end).getTime();
  const subscriptionExpired =
    Date.now() > new Date(users.current_period_end).getTime();

  console.log("Subscription Status:", subscriptionStatus);
  console.log("Grace Period Expired:", graceExpired);
  console.log("Subscription Expired:", subscriptionExpired);
  console.log("Cancel at period end:", users.cancel_at_period_end);

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

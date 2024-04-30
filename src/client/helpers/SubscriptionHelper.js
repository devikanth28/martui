import Validate from "./Validate";

export const isUpcomingSubscription = (subscription) => {
    const subscriptionStartDate = new Date(subscription.startDate);
    const todayDate = new Date();
    return subscriptionStartDate.getTime() - todayDate.getTime() > 0;
}

export const isSubscriptionsHaveSameEndDate = (subscriptions) => {
    if (Validate().isNotEmpty(subscriptions) && subscriptions.length == 2) {
        let subs1EndDate = new Date(subscriptions[0].endDate);
        let subs2EndDate = new Date(subscriptions[1].endDate);
        return subs1EndDate.getTime() == subs2EndDate.getTime();
    }
    return false;
}

export const isSubscriptionsHaveRenewAllowed = (subscriptions) => {
    if (Validate().isNotEmpty(subscriptions) && subscriptions.length == 2) {
        return subscriptions[0].renewalAllowed && subscriptions[1].renewalAllowed;
    }
    return false;
}
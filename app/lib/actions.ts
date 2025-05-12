"use server";
import webpush from "web-push"
import { mailId } from "./utils";
//using it from the server

webpush.setVapidDetails(
    mailId,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

let subcriptionUser: PushSubscription | null = null;


export async function subscribeUser(subscription: PushSubscription
    | null
) {
    subcriptionUser = subscription;
    //calling the database as well -- adding to the users table in the mongodb - requires the userId and other things.4
    return { success: true }
}


export async function unsubscribeUser() {
    subcriptionUser = null;
    //deleting the user's subscription value from the mongodb
    return { success: true }
}
export async function sendNotification(message: string, data?: string) {
    if (!subcriptionUser) {
        console.log("no such subscription for the user is found")
        // throw new Error("no subscription is found")
        return;
    }
    try {
        let payload = JSON.stringify({
            title : "new nofitication",
            body: message
        })
        //@ts-ignore
        webpush.sendNotification(subcriptionUser, payload)

        return { success: true }
    } catch (err) {
        console.log("error -- push notification", err)
        return { success: false, error: "failed to send notification" }
    }


}
"use client"
import { useEffect, useState } from "react"
import {subscribeUser, unsubscribeUser, sendNotification} from "@/app/(protected)/lib/actions"
export function NotificationManager() {

    return <div>
        <PushNotificationManager/>
        <InstallPrompt/>
    </div>
}


function urlbase64toUnit8Array(url:Base64URLString):Uint8Array {
    let padding = "=".repeat((4-url.length%4)%4);
    let string = (url + padding).replace("-", "+").replace("_","/");
    let decode = window.atob(string);
    let rawData = new Uint8Array(decode.length);
    for(var x = 0 ; x < string.length; x++) {
        rawData[x] = decode[x].charCodeAt(0) as number;
    }
    return  rawData;
}


function PushNotificationManager() {
    const [suppported, setSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription| null>(null)
    const [message, setMessage] = useState("");

    useEffect(  function() {
        //checking for the support and in case of the support getting the 
        if("serviceWorker" in navigator && "PushManager" in window) {
            setSupported(true)
            registerWorker();
        }
    },[])

    async function registerWorker() {
        const registration = await navigator.serviceWorker.register("/sw.js", {
            scope:"/",
            "updateViaCache":"none"
        });
        const subs = await (registration).pushManager.getSubscription();
        console.log("registered service worker")
        setSubscription(subs)
    }
    async function subscribeToPush() {

        const registration = await navigator.serviceWorker.ready ;
        const subs = await registration.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        })

        setSubscription(subs)
        let subscriptionValue = await JSON.parse(JSON.stringify(subs))
        await subscribeUser(subscriptionValue);
    }
    async function unsubscribeFromPush() {
        subscription?.unsubscribe()
        setSubscription(null);

        await unsubscribeUser();
    }
    async function testSendNotification() {
        if(subscription) {
            let returnNotification = sendNotification(message);
            console.log(returnNotification, message)
            setMessage("")
        }

    }
    if(!suppported) {
        return <div>Push Notification is not supported in this website mobile.</div>
    }

    return <div>
        {
            subscription ? <div>
                <p>You are already subscribed</p>
                <p>click down to unsubscribe</p>
                <button onClick={function() {
                    unsubscribeFromPush();
                }}>Unsubscribe</button>
                <div>
                    developer mode : 
                    testing the notification message 
                    <input type="text" onChange={function (evOb) {setMessage(evOb.target.value)}}  placeholder="type test notification message"/>
                    <button onClick={function () {
                        testSendNotification()
                    }}>send notification</button>
                </div>
            </div> : <div>
                <p>You are not subscribed to the Notification</p>
                <button onClick={function() {
                    subscribeToPush();
                }}> subscribe </button>
            </div>
        }
    </div>
}

function InstallPrompt() {
    const [isIOS, setIsIos] = useState(false);
    const [installed, setInstalled] = useState(false)

    useEffect(function () {
        let userAgent = window.navigator.userAgent;
        let pattern = /(IOS|IPAD|MACOS)/i
        if(pattern.exec(userAgent) && !(window as any).MSStream){
            setIsIos(true)
        } 

    if(window.matchMedia("(display-mode:standalone)").matches) {
        setInstalled(true)
    }

    },[])

    if(installed) {
        return null;
    }

    return <div>
        <p>Install the application</p>
        <p>Add to Home Screen</p>
        {isIOS && (<div>

            <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then Add to &quot;Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>.
        </p>

        </div>)}

    </div>
}

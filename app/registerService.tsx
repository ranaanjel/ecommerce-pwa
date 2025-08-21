"use client"

import { useEffect } from "react"

export function RegisterServiceWorker() {

    useEffect(function () {
        if("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw2.js", {scope:"/"}).then(m => {
                console.log("service worker registered")
            }).catch(err => console.log(err, "service worker not registered"))
        }
},[])

    return <div></div>
}
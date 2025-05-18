"use client"

import React, { ReactElement, useEffect, useState } from "react"
import Image from "next/image";

export default function FallbackUIDesktop({children}: {children: React.ReactNode}) {

    const [isMobile, setIsMobile] = useState(false);

    const checkDevice = () => {
        let ua = window.navigator.userAgent;
        let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        let pattern = /(android|iphone|phone|blackberry|opera mini|ipod|iemobile)/i;
        let smallDevice = window.innerWidth < 768;
        return (pattern.test(ua) && isTouchDevice) || smallDevice;
    }

    function handleResize() {
        setIsMobile(checkDevice());
    }

    useEffect(function ()  {
        setIsMobile(checkDevice());

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);

    },[])

    if(!isMobile) {
    return <div className="p-4 text-center">
        <p>Please make sure to use the application on the mobile web browser.</p>
        <p>Coming soon in the Desktop Website</p>
        <Image src={"/favicon.svg"} height={"100"} width="100" alt="company-logo" className="mx-auto my-4"/>
        <p>@quikcrats</p>
    </div>
    }

    return <div>
        {children}
    </div>
}
import React, { ReactElement, useEffect, useState } from "react"

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

    return <div>
        <p>Please make sure to use the application on the mobile web browser.</p>
        <p>Coming soon in the Desktop Website</p>
    </div>
    }

    return <div>
{children}
    </div>
}
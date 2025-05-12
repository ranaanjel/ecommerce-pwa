"use client"

import { useState, useEffect } from "react";
import { NotificationManager } from "./ui/notificationManager/notificationManager";
import FallbackUIDesktop from "./ui/fallback-desktop";

export default function Home() {

  //requires the authentication in order to send the user to different pages and other routes.

  return <FallbackUIDesktop>
      <NotificationManager/>
    </FallbackUIDesktop>

}

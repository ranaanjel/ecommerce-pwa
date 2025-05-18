"use client";

import { useState, useEffect } from "react";
import { NotificationManager } from "./ui/notificationManager/notificationManager";
import FallbackUIDesktop from "./ui/fallback-desktop";

export default function Home() {

  return (
      <NotificationManager />
  );
}

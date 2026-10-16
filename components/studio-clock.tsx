"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Kuala_Lumpur" });
function subscribe(update: () => void) {
  const timer = window.setInterval(update, 15_000);
  return () => window.clearInterval(timer);
}

/** A live, registered datum: the studio's local time. The server renders a stable placeholder. */
export function StudioClock() {
  const time = useSyncExternalStore(subscribe, () => format.format(new Date()), () => null);
  return <span className="studio-clock">Studio time <time>{time ?? "--:--"}</time> in Malaysia (GMT+8)</span>;
}

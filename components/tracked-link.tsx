"use client";
import Link from "next/link";
import { track } from "@/lib/analytics";
import type { ComponentProps } from "react";
export function TrackedLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} onClick={event => { track({ name: "cta_click", label: event.currentTarget.textContent || "", destination: String(props.href) }); props.onClick?.(event); }} />;
}

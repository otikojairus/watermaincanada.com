"use client";

import { ReactNode } from "react";
import { EMERGENCY_PHONE_DISPLAY } from "@/lib/seo";

type PhoneLinkProps = {
  children?: ReactNode;
  className?: string;
  location?: string;
  pageTier?: string;
  ariaLabel?: string;
};

export function PhoneLink({
  children,
  className,
  location = "sitewide",
  pageTier = "global",
  ariaLabel,
}: PhoneLinkProps) {
  function handleClick() {
    if (typeof window === "undefined") {
      return;
    }

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", "call_click", {
      location,
      page_tier: pageTier,
    });
  }

  return (
    <a
      href="tel:18887022090"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel ?? `Call ${EMERGENCY_PHONE_DISPLAY}`}
    >
      {children ?? `Call ${EMERGENCY_PHONE_DISPLAY}`}
    </a>
  );
}

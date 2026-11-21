"use client";

/**
 * Advertising pixels, marketing website only (privacy policy §8).
 *
 * Off unless a pixel id is set at build time (NEXT_PUBLIC_META_PIXEL_ID,
 * NEXT_PUBLIC_GOOGLE_ADS_ID, NEXT_PUBLIC_LINKEDIN_PARTNER_ID), and never loaded
 * when the browser sends Global Privacy Control or the visitor opted out at
 * /privacy-choices. The privacy policy promises both — do not load a pixel any
 * other way, and never add one to the Harlo apps.
 */

import { useEffect } from "react";

export const PIXELS = {
  meta: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  google: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "",
};

export const ANY_PIXEL = Boolean(PIXELS.meta || PIXELS.google || PIXELS.linkedin);

const OPT_OUT_KEY = "harlo-ads-opt-out";

export function gpcOn(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function optedOut(): boolean {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    // Storage blocked: treat as opted out rather than track someone we can't remember.
    return true;
  }
}

export function setOptOut(out: boolean) {
  try {
    if (out) localStorage.setItem(OPT_OUT_KEY, "1");
    else localStorage.removeItem(OPT_OUT_KEY);
  } catch {
    /* nothing to remember it in */
  }
}

function script(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

type W = Window & Record<string, unknown>;

export function AdPixels() {
  useEffect(() => {
    if (!ANY_PIXEL || gpcOn() || optedOut()) return;
    const w = window as unknown as W;

    if (PIXELS.google) {
      const layer = ((w.dataLayer as unknown[]) ??= []);
      w.gtag = function gtag() {
        // gtag reads the arguments object itself.
        // eslint-disable-next-line prefer-rest-params
        layer.push(arguments);
      };
      (w.gtag as (...a: unknown[]) => void)("js", new Date());
      (w.gtag as (...a: unknown[]) => void)("config", PIXELS.google);
      script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(PIXELS.google)}`);
    }

    if (PIXELS.meta && !w.fbq) {
      const queue: unknown[] = [];
      const fbq = (...a: unknown[]) => queue.push(a);
      Object.assign(fbq, { queue, loaded: true, version: "2.0", push: fbq });
      w.fbq = w._fbq = fbq;
      fbq("init", PIXELS.meta);
      fbq("track", "PageView");
      script("https://connect.facebook.net/en_US/fbevents.js");
    }

    if (PIXELS.linkedin) {
      w._linkedin_partner_id = PIXELS.linkedin;
      script("https://snap.licdn.com/li.lms-analytics/insight.min.js");
    }
  }, []);

  return null;
}

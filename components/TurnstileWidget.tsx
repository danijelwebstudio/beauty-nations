"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileSettings = {
  sitekey: string;
  action: string;
  theme: "dark";
  "response-field": false;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileSettings) => string;
      remove: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve();
      else reject(new Error("Turnstile API unavailable"));
    };
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

interface Props {
  action: string;
  onTokenChange: (token: string) => void;
  resetKey: number;
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function TurnstileWidget({ action, onTokenChange, resetKey }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!turnstileSiteKey || !containerRef.current) return;

    const container = containerRef.current;
    let active = true;
    let widgetId: string | undefined;

    loadTurnstile()
      .then(() => {
        if (!active || !window.turnstile || !container.isConnected) return;
        widgetId = window.turnstile.render(container, {
          sitekey: turnstileSiteKey,
          action,
          theme: "dark",
          "response-field": false,
          callback: onTokenChange,
          "expired-callback": () => onTokenChange(""),
          "error-callback": () => onTokenChange(""),
        });
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, [action, onTokenChange, resetKey]);

  return (
    <div>
      <div ref={containerRef} className="min-h-16" aria-label="Security verification" />
      {!turnstileSiteKey ? (
        <p role="alert" className="font-body text-xs text-red-200">
          Security verification is not configured yet.
        </p>
      ) : error ? (
        <p role="alert" className="font-body text-xs text-red-200">
          Security verification could not load. Please refresh the page.
        </p>
      ) : null}
    </div>
  );
}

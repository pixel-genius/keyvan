"use client";

import { useEffect, useState } from "react";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWAStatus() {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    // Check if app is running in standalone mode (installed)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWAInstalled(true);
    }

    // Check if app is installed on iOS
    if ((window.navigator as NavigatorWithStandalone).standalone) {
      setIsPWAInstalled(true);
    }
  }, []);

  if (!isPWAInstalled) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-green-500 text-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-medium">اپلیکیشن نصب شده است</span>
        </div>
      </div>
    </div>
  );
}

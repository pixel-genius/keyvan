"use client";

import { useEffect, useState } from "react";
import { pwaManager } from "@/lib/pwa";

export default function PWAInstaller() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Register service worker
    pwaManager.registerServiceWorker();

    // Setup install prompt
    pwaManager.setupInstallPrompt();

    // Check if install prompt is available
    const checkInstallable = () => {
      setIsInstallable(pwaManager.isInstallPromptAvailable());
    };

    // Check initially
    checkInstallable();

    // Listen for install prompt events
    window.addEventListener("beforeinstallprompt", checkInstallable);

    return () => {
      window.removeEventListener("beforeinstallprompt", checkInstallable);
    };
  }, []);

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const success = await pwaManager.promptInstall();
      if (success) {
        console.log("App installed successfully");
      }
    } catch (error) {
      console.error("Installation failed:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsInstallable(false);
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                نصب اپلیکیشن
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                برای دسترسی آسان‌تر، اپلیکیشن را نصب کنید
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInstalling ? "در حال نصب..." : "نصب"}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              بعداً
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

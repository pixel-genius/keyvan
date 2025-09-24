// PWA Utilities

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export class PWAManager {
  private static instance: PWAManager;
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private isInstallable = false;

  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager();
    }
    return PWAManager.instance;
  }

  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === "undefined") return null;

    if ("serviceWorker" in navigator) {
      try {
        // next-pwa auto-registers; just return current registration when ready
        const existing = await navigator.serviceWorker.getRegistration();
        if (existing) {
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            window.dispatchEvent(new CustomEvent("sw:reloaded"));
          });
          if (existing.waiting && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent("sw:waiting"));
          }
          existing.addEventListener("updatefound", () => {
            const newWorker = existing.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                window.dispatchEvent(new CustomEvent("sw:waiting"));
              }
            });
          });
          return existing;
        }
        return null;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
        return null;
      }
    }
    return null;
  }

  setupInstallPrompt(): void {
    if (typeof window === "undefined") return;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.isInstallable = true;
    });
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    this.deferredPrompt = null;
    this.isInstallable = false;

    return outcome === "accepted";
  }

  isInstallPromptAvailable(): boolean {
    return this.isInstallable;
  }

  isStandalone(): boolean {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorWithStandalone).standalone === true
    );
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (typeof window === "undefined") return "denied";

    if (!("Notification" in window)) {
      return "denied";
    }

    if (Notification.permission === "default") {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  async showNotification(
    title: string,
    options?: NotificationOptions,
  ): Promise<void> {
    if (typeof window === "undefined") return;

    if (Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: "/img/logo-PWA.png",
        badge: "/img/logo-PWA.png",
        ...options,
      });
    }
  }

  isOnline(): boolean {
    if (typeof window === "undefined") return true;
    return navigator.onLine;
  }

  addOnlineStatusListener(callback: (isOnline: boolean) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Return cleanup function
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }

  async checkForUpdate(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const registration = await navigator.serviceWorker.ready;

    return new Promise((resolve) => {
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              resolve(true);
            }
          });
        }
      });
    });
  }

  async updateApp(): Promise<void> {
    if (typeof window === "undefined") return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    } else {
      await registration.update();
    }
  }

  async clearNotifications(): Promise<void> {
    if (typeof window === "undefined") return;
    const registration = await navigator.serviceWorker.getRegistration();
    registration?.active?.postMessage({ type: "CLEAR_NOTIFICATIONS" });
  }
}

// Export singleton instance
export const pwaManager = PWAManager.getInstance();

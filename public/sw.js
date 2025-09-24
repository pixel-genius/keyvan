const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/img/logo-PWA.png",
  // Add other static assets here
];

// Install - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - handle caching
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip Next.js Image Optimization URLs
  if (url.pathname.startsWith("/_next/image")) {
    return;
  }

  // API requests - network first
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.status === 200) {
            const resClone = res.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, resClone));
          }
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static & other requests - cache first
  event.respondWith(
    caches.match(request).then((cacheRes) => {
      if (cacheRes) return cacheRes;

      return fetch(request).then((res) => {
        if (!res || res.status !== 200 || res.type !== "basic") return res;

        const resClone = res.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, resClone));
        return res;
      }).catch(() => caches.match("/")); // fallback to home page
    })
  );
});

// Background sync
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      console.log("Background sync triggered")
      // Add actual tasks here
    );
  }
});

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New notification",
    icon: "/img/logo-PWA.png",
    badge: "/img/logo-PWA.png",
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 },
    actions: [
      { action: "explore", title: "مشاهده", icon: "/img/logo-PWA.png" },
      { action: "close", title: "بستن", icon: "/img/logo-PWA.png" },
    ],
  };
  event.waitUntil(self.registration.showNotification("Keyvan App", options));
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"));
  }
});

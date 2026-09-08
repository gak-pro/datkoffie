// ── Service Worker: DAT KOFFIE Kasir ──────────────────────────
// Menaikkan versi CACHE_NAME setiap kali index.html/aset diubah & di-push
// ke GitHub, supaya kasir otomatis dapat versi terbaru (lihat listener
// "controllerchange" di index.html yang me-reload halaman sekali).
const CACHE_NAME = "datkoffie-kasir-v3";

// App shell: file statis yang di-cache supaya app tetap bisa dibuka
// (tampilan) walau koneksi internet lagi lemot/putus.
// Catatan: data (produk, transaksi, dll) tetap butuh internet karena
// diambil langsung dari Google Apps Script / Spreadsheet secara live.
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Strategi: network-first untuk file app shell (biar selalu dapat versi
// terbaru kalau online), fallback ke cache kalau offline.
// Request ke Google Apps Script (data) selalu lewat network langsung,
// tidak di-cache, karena datanya harus selalu real-time.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Biarkan request ke Apps Script / domain lain lewat apa adanya.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

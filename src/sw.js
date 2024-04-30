const PRODUCTION_URL = "https://www.medplusmart.com"
const LOCALHOST = "http://localhost:8080"
const ENV = "https://irismart.medplusindia.com:2543/"


workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    new RegExp(ENV),
    new workbox.strategies.StaleWhileRevalidate()
  );

workbox.precaching.precacheAndRoute(self.__precacheManifest);
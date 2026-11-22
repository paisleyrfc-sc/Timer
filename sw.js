// Keeps the circuit timer available with no signal after it has been opened once.
// Change the version name when you upload a new index.html.
var CACHE = "circuit-timer-v19";

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(["./"]); }).catch(function () {}));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// The page comes fresh from the network if it answers within 2.5 seconds, so updates show on the first open.
// With a poor signal or none, the saved copy is used instead.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var saved = function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("./"); });
  };
  if (e.request.mode === "navigate") {
    e.respondWith(new Promise(function (resolve) {
      var done = false;
      function finish(res) { if (!done && res) { done = true; resolve(res); } }
      var timer = setTimeout(function () { saved().then(finish); }, 2500);
      fetch(e.request.url, { cache: "no-store" }).then(function (res) {
        if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put("./", copy); }); }
        clearTimeout(timer); finish(res);
      }, function () {
        clearTimeout(timer);
        saved().then(function (r) { finish(r || Response.error()); });
      });
    }));
    return;
  }
  e.respondWith(saved().then(function (hit) { return hit || fetch(e.request); }));
});

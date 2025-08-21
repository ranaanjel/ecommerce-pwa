self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open("offline")
    )
})
self.addEventListener("fetch", fetchEvent => {

    fetchEvent.respondWith(fetch(fetchEvent.request).then(res => {
        let clone = res.clone();
       if (fetchEvent.request.url.startsWith("http")) {
          const resClone = res.clone();
          caches.open("offline").then(cache => {
            cache.put(fetchEvent.request, resClone);
          });
        }
        return res;
    }).catch( ()=> caches.match(fetchEvent.request)))
})
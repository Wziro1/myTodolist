const staticTodoList = "my-todo-list-v1";
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/main.js",
    "/images/list-512.png",
    "/images/list-256.png",
    "/images/list-128.png",
    "/images/list-64.png",
    "/images/list-32.png",
    "/images/list-16.png"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTodoList).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(response => {
            return response || fetch(fetchEvent.request)
        })
    )
})
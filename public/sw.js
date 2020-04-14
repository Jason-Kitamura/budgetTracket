const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'index.js',
    'styles.css',
]

//call install event
self.addEventListener('install', e => {
    console.log('service worker installed');

    e.waitUntil(
        caches
            .open( cacheName )
            .then( cache => {
                console.log( 'Sergice Worker: Caching files' );
                cache.addAll( cacheAssets );
            })
            .then( () => self.skipWaiting() )
    );
});

//call activate event
self.addEventListener('activate', e => {
    console.log('service worker activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache != cacheName){
                        console.log('Service Worker Clearing Old Caches');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );

})

self.addEventListener('fetch', e => {
    console.log('fetching files');
    const req = e.request;

        e.respondWith(
            fetch( req )
                .then(res => {
                    //make copy clone of response
                    const resClone = res.clone();
                    caches
                        .open( cacheName )
                        .then(cache => {
                            cache.put( req , resClone);
                        });
                    return res
                }).catch(err => caches.match( req ).then(res => res))
        );
})

async function cacheFirst( req ){
    const cachedResponse = await caches.match( req );
    return cachedResponse || fetch( req );
}
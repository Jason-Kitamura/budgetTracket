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

})

// self.addEventListener('fetch', e => {
//     console.log('fetching files');
//     const req = e.request;
//     const url = new URL( req.url );

//     if ( url.origin === location.url ) {
//         e.respondWith( cacheFirst( req) );
//     } else {
//         e.respondWith( networkAndCache( req ) );
//     }
// })
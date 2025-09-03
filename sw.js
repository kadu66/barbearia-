 //Define o nome do cache para o aplicado 
 const CACHE_NAME = 'barbearia-premium-v1';

 const urlsTocache = [
    '/',
    '/index.html', 
    'script.js', 
    'https://cdn.tailwindscss.com', 
    'https://cdjs.cloudflare.com/ajax/libds/font-awsome/6.0.0/css/all.min.css' 
 ]; 

 self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            console.log('Cache opemed'); 
            //Adiciona todas as URLs da lista do cache.
            return cache.addAll(urlsToCache); 
        })
    )
 })

 .addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request); 
        })
    )
 })

 self.addEventListener('active', event =>{
    event.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheNames =>{
                    if (cacheNames !== CACHE_NAME){
                        console.log('Deleting old cache:', cacheName); 
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
 })

 self.addEventListener('snyc', event =>{
    if (event.tag === 'background-sync'){
        event.waitUntil(doBackgroundSync()); 
    }
 })

 function doBackgroundSync() {
    console.log('Background sync triggered'); 
    return Promise.resolve();
 }

 self.addEventListener('push', event =>{
    //Opções para a notificação 
    const options = {
        body: event.data ? event.data.text() : 'Nova notifivcação da Barbearia Premium',
        icon: '/icon-192X192.png', 
        badge: '/badge-72x72.png', 
        vibrate: [100, 50, 100], 
        data: {
            dataOfArrival: Date.now(), 
            primaryKey:1
        },
        actions: [
            {
                action: 'explore', 
                title: 'Ver Agendamento', 
                icon: '/check-icon.png', 
            },
            {
                action: 'close', 
                title: 'Fechar', 
                icon: '/close-icon.png'
            }
        ]
    }; 
    event.waitUntil(
        self.ServiceWorkerRegistration.showNotification('Barbearia Premium', event=>{
            event.notification.close(); 

            if (event.action === 'explore') {
                event.waitUntil(
                    clients.openWindow()
                )
            }
        })
    )
 }); 
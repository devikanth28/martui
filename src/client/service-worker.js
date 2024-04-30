self.addEventListener('install', function(event) {
	 event.waitUntil(
	    caches.open("offlineCache").then(function(cache) {
	      return cache.addAll([
	         '/offline.html'
	      ]);
	    })
	  );
	});
self.addEventListener('fetch', function(event) {
	if (event.request.url.indexOf(".mbl") > 0 
			  || event.request.url.indexOf("mobile.medplusindia.com") > 0 
			  || event.request.url.indexOf("doctors-api") > 0 
			  || event.request.url.indexOf("upload?token") >= 0 
			  || event.request.url.indexOf("asset-manifest.json") >= 0
			  || event.request.url.indexOf("service-worker.js") >= 0
			  || event.request.url.indexOf("service%2dworker%2ejs") >= 0) {
        return false;
      }
	  event.respondWith(
	    caches.match(event.request).then(function(response) {
	      return response || fetch(event.request);
	    }).catch(function() {
	      return caches.match('/offline.html');
	    })
	  );
	});

self.addEventListener('beforeinstallprompt', function(e){
  	e.userChoice.then(function(choiceResult) {
		console.log(choiceResult.outcome);
		if(typeof ga != "undefined"){
			ga('send', 'event', 'A2H', choiceResult.outcome); 
		}
  });
});

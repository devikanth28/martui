importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

firebase.initializeApp({
   /*  apiKey: "AIzaSyCTAQnE5kdpslB0PI46NeRXQ5Vdfk3fJlU",
    authDomain: "medplus-app-ef8a9.firebaseapp.com",
    databaseURL: "https://medplus-app-ef8a9.firebaseio.com",
    projectId: "medplus-app-ef8a9",
    storageBucket: "medplus-app-ef8a9.appspot.com",
    messagingSenderId: "469243437140",
    appId: "1:469243437140:web:99470594a7c0e2a0cd0dc1" */    
    messagingSenderId: "588873455228",
});

firebase.messaging();

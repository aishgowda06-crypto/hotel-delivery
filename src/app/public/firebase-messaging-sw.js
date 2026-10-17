importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDummyKeyForFallback-BuyBrigg",
  projectId: "buybrigg-notifications",
  messagingSenderId: "103959432019",
  appId: "1:103959432019:web:58219bee2922c98d"
});

const messaging = firebase.messaging();
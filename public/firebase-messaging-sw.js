importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDxBOa3ciYVdVmfYwyEIF2Rlg3b5QRcNkw",
  authDomain: "buybrigg-notifications.firebaseapp.com",
  projectId: "buybrigg-notifications",
  storageBucket: "buybrigg-notifications.firebasestorage.app",
  messagingSenderId: "790613462958",
  appId: "1:790613462958:web:0f8f70123c41935cbb823f",
  measurementId: "G-Y1HMZ2JV4C"
});

const messaging = firebase.messaging();

// Handle background push notifications when the app is closed, minimized, or in the background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification?.title || '⚡ New Order Dispatch';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new delivery order!',
    icon: '/icon.png',
    tag: 'delivery-dispatch'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
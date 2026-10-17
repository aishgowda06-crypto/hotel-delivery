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
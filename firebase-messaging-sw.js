importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBQ4vGjiLjaAG5kIP-IWab441RETilwdks",
  authDomain: "nacos-app.firebaseapp.com",
  databaseURL: "https://nacos-app-default-rtdb.firebaseio.com",
  projectId: "nacos-app",
  storageBucket: "nacos-app.firebasestorage.app",
  messagingSenderId: "982514858036",
  appId: "1:982514858036:web:66e7bb244b772ce65d7261",
  measurementId: "G-R48BS4FSX5",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/path/to/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

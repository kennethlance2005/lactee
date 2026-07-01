// assets/js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgtXZAe_-Wj0D4Pd-t2BYAU3E2faUF86M",
  authDomain: "hmbms-f70b5.firebaseapp.com",
  projectId: "hmbms-f70b5",
  storageBucket: "hmbms-f70b5.firebasestorage.app",
  messagingSenderId: "276256441806",
  appId: "1:276256441806:web:2e3db876c0dddbfb37979f",
  measurementId: "G-XD87JGC0MZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage, firebaseConfig };
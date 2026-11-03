import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// إعدادات Firebase للويب (الـ apiKey هنا عام بطبعه، الحماية الحقيقية في Security Rules)
const firebaseConfig = {
  apiKey: "AIzaSyCSbCxAhRdo3lam1BrWEtXdF1Yd5ZHCIB0",
  authDomain: "exams-accounts.firebaseapp.com",
  databaseURL: "https://exams-accounts-default-rtdb.firebaseio.com",
  projectId: "exams-accounts",
  storageBucket: "exams-accounts.firebasestorage.app",
  messagingSenderId: "152062709975",
  appId: "1:152062709975:web:52838b2d00a4803305a092",
  measurementId: "G-Y58RKQ2X85"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// الدخول حاليًا بيتحقق من قاعدة البيانات (شوف session.js).
// Firebase Authentication هتتضاف لاحقًا (getAuth من firebase-auth.js).

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA5E6tRwztfzLQWh2BLYbJlgDku3E8z50",
  authDomain: "anzyblog-6908d.firebaseapp.com",
  projectId: "anzyblog-6908d",
  storageBucket: "anzyblog-6908d.firebasestorage.app",
  messagingSenderId: "1029306871234",
  appId: "1:1029306871234:web:f9eaf824726d9642a87a5b",
  measurementId: "G-B1T8LVYNLW"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// (Optional) Initialize Analytics
const analytics = getAnalytics(app);

// ✅ Export app so you can import it in login.js, dashboard.js, etc.
export { app };

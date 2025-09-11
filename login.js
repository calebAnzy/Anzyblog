// Import Firebase Auth
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { app } from "./firebase.js"; // if you put firebase config separately

// Initialize Auth
const auth = getAuth(app);

// ----- LOGIN -----
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "dashboard.html"; // redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  });
}

// ----- LOGOUT -----
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html"; // back to homepage
  });
}

// ----- PROTECT DASHBOARD -----
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("dashboard.html")) {
    // if not logged in, redirect
    window.location.href = "login.html";
  }
});

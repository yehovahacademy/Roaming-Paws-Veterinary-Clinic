import { auth } from "./firebase.js";
import { 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

const userInfo = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout");

// Get current file name EXACTLY
const currentPage = window.location.pathname.split("/").pop();

// Define public pages EXACTLY as your files
const publicPages = ["Login.html", "Register.html"];

// Wait for auth state
onAuthStateChanged(auth, (user) => {

  console.log("Current Page:", currentPage);
  console.log("User:", user);

  // 🔒 Not logged in → allow ONLY public pages
  if (!user && !publicPages.includes(currentPage)) {
    window.location.replace("Login.html");
    return;
  }

  // 🔁 Logged in → block login/register
  if (user && publicPages.includes(currentPage)) {
    window.location.replace("index.html");
    return;
  }

  // ✅ UI updates
  if (user) {
    if (userInfo) userInfo.innerText = `Welcome, ${user.email}`;
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }

});

// 🚪 Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace("Login.html");
  });
}
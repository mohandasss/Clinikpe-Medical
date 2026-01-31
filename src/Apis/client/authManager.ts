
export function redirectToLogin() {
  
  if (window.location.pathname === "/login") {
    return;
  }

  window.location.replace("/login");
}

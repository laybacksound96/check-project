export function getAuthToken() {
  const cookie = document.cookie;
  if (cookie) {
    const cookieFragment = cookie.split("=");
    localStorage.setItem(cookieFragment[0], cookieFragment[1]);
  }
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  return token;
}
export function loadToken() {
  return getAuthToken();
}

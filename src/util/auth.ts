export function getAuthToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  return token;
}
export function loadToken() {
  return getAuthToken();
}

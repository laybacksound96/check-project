export interface LoginToken {
  accessToken: string;
}
export function getAuthToken(): LoginToken | null {
  const cookie = document.cookie;
  if (cookie) {
    const cookiePairs = cookie.split(";");
    let accessToken = "";
    cookiePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key.trim() === "accessToken") accessToken = value;
      localStorage.setItem(key.trim(), value);
    });
    if (!accessToken) return null;
    return { accessToken };
  }
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null;
  }
  return { accessToken };
}
export function loadToken() {
  return getAuthToken();
}

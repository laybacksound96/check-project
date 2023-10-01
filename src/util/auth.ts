export interface LoginToken {
  accessToken: string;
  user_id: string;
}
export function getAuthToken(): LoginToken | null {
  const cookie = document.cookie;
  console.log(cookie);
  if (cookie) {
    const cookiePairs = cookie.split(";");
    let accessToken = "";
    let user_id = "";
    cookiePairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key.trim() === "accessToken") accessToken = value;
      if (key.trim() === "user_id") user_id = value;
      localStorage.setItem(key.trim(), value);
    });
    if (!accessToken || !user_id) return null;
    return { accessToken, user_id };
  }
  const accessToken = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("user_id");
  if (!accessToken || !user_id) {
    return null;
  }
  return { accessToken, user_id };
}
export function loadToken() {
  return getAuthToken();
}

import axios from "axios";

export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/user/login");

  return response.data.loginUrl;
}

export async function fetchSearchAccount(): Promise<object> {
  const response = await axios.get("http://localhost:4000/user/character");
  console.log(response);
  return {};
}

export function fetchCheck() {
  return console.log("called by fetchCheck()");
}

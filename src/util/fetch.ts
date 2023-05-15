import axios from "axios";

export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/login");
  console.log(response);
  return response.data.loginUrl;
}

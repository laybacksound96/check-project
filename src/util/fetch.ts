import axios from "axios";

export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/user/login");

  return response.data.loginUrl;
}

export async function fetchSearchAccount(inputValue: string): Promise<object> {
  const response = await axios.post(
    "http://localhost:4000/user/character",
    { name: inputValue },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return {};
}

export function fetchCheck() {
  return console.log("called by fetchCheck()");
}

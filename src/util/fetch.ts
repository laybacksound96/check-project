import axios from "axios";

export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/user/login");

  return response.data.loginUrl;
}
export async function fetchTest(id: string): Promise<string> {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(`http://localhost:4000/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return response.data.loginUrl;
}
export async function fetchSearchAccount(inputValue: string): Promise<[]> {
  const response = await axios.post(
    "http://localhost:4000/user/character",
    { name: inputValue },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

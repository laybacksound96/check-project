import axios from "axios";
import { IData } from "../CustomHooks/Login/useSetAllAtoms";
export interface IFetchedData {
  user_id: string;
  user_name: string;
  global_name: string;
  discriminator: string;
  banner_color: string;
}
export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/user/login");

  return response.data.loginUrl;
}
export async function patchUser(
  id: string,
  data: IData
): Promise<IFetchedData> {
  const token = localStorage.getItem("accessToken");
  try {
    if (!data || !token) throw new Error("Invalid Data or Token");
    const response = await axios.post(
      `http://localhost:4000/user/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchSearchAccount(inputValue: string): Promise<[]> {
  const response = await axios.post(
    "http://localhost:4000/api/character",
    { name: inputValue },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

import axios from "axios";

import { json } from "react-router-dom";
import { IAllAtoms } from "../page/Dashboard";
export interface IFetchedData {
  user_id: string;
  user_name: string;
  global_name: string;
  discriminator: string;
  banner_color: string;
  data: string;
}

export const loadUserData = async (id: string) => {
  const response = await axios.get<IFetchedData>(
    `http://localhost:4000/user/${id}`
  );
  if (response.statusText !== "OK") {
    throw json(
      { message: "id에 맞는 정보를 fetch해오지 못했습니다." },
      {
        status: 500,
      }
    );
  } else {
    return response.data;
  }
};
export async function fetchLogin(): Promise<string> {
  const response = await axios.get("http://localhost:4000/user/login");

  return response.data.loginUrl;
}
export async function patchUser(id: string, data: IAllAtoms): Promise<string> {
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
    return response.statusText;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchSearchAccount(inputValue: string): Promise<[]> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/character",
      { name: inputValue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 503) {
      throw new Error("서버가 점검중이에요");
    }
    if (response.statusText !== "OK") {
      throw new Error("알 수 없는 오류가 있어요");
    }

    return response.data;
  } catch (error) {
    throw new Error("알 수 없는 오류가 있어요");
  }
}

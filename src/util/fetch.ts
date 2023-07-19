import axios, { AxiosResponse } from "axios";

import { json } from "react-router-dom";
import { IAllAtoms } from "../page/Dashboard";
export interface IFetchedData {
  user_id: string;
  user_name: string;
  global_name: string;
  discriminator: string;
  banner_color: string;
  data: string;
  ownCharacters: string[];
}
export interface ISearchedData {
  user_id: string;
  global_name: string;
  user_name: string;
}

export const loadUserData = async (id: string) => {
  const response = await axios.get<IFetchedData>(`/user/${id}`);
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
  const response = await axios.get(`/user/login`);

  return response.data.loginUrl;
}
let lastCallTimeout: any = null;
export async function search(
  name: string,
  setter: React.Dispatch<React.SetStateAction<ISearchedData[]>>
) {
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(async () => {
    try {
      await axios
        .get<ISearchedData[]>(`/user/search?username=${name}`)
        .then((response: AxiosResponse<ISearchedData[]>) => {
          const data: ISearchedData[] = response.data;
          setter(data);
        });
      lastCallTimeout = null;
      return;
    } catch (error) {
      throw error;
    }
  }, 1000);
}
export async function patchUser(id: string, data: IAllAtoms): Promise<string> {
  const token = localStorage.getItem("accessToken");
  try {
    if (!data || !token) throw new Error("Invalid Data or Token");
    const response = await axios.post(`/user/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    return response.statusText;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchSearchAccount(inputValue: string): Promise<[]> {
  try {
    const response = await axios.post(
      `/api/character`,
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

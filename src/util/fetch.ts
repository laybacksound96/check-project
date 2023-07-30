import axios, { AxiosResponse } from "axios";

import { IAllAtoms } from "../page/Dashboard";
export interface IFetchedData {
  user_id: string;
  user_name: string;
  global_name: string;
  discriminator: string;
  banner_color: string;
  data: {
    text: string;
  };
  ownCharacters: string[];
}
export interface ISearchedData {
  user_id: string;
  global_name: string | null;
  user_name: string;
  discriminator: string;
}

const url2 = "https://www.checksheet.link/";
const url = "http://localhost:8080/";

export const loadUserData = async (id: string) => {
  const response = await axios.get<IFetchedData>(`${url}user/${id}`);
  return response.data;
};
export async function fetchLogin(): Promise<string> {
  const response = await axios.get(`${url}user/login`);
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
        .get<ISearchedData[]>(`${url}user/search?username=${name}`)
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
export async function patchUser(id: string, data: IAllAtoms): Promise<number> {
  const token = localStorage.getItem("accessToken");
  try {
    if (!data || !token) return 401;
    const response = await axios.post(`${url}user/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    return response.status;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchSearchAccount(inputValue: string): Promise<[]> {
  try {
    const response = await axios.post(
      `${url}api/character`,
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

    return response.data;
  } catch (error) {
    throw new Error("알 수 없는 오류가 있어요");
  }
}

import axios from "axios";
import { IAccount } from "../atoms/data";

export interface IFetchedData {
  user: {
    user_id: string;
    user_name: string;
    global_name: string;
    discriminator: string;
    banner_color: string;
    data: {
      text: string;
    };
    ownCharacters: string[];
    accountOrder: string[];
  };
  isLoggined: boolean;
}
export interface ISearchedData {
  user_id: string;
  global_name: string | null;
  user_name: string;
  discriminator: string;
}

const url2 = "https://www.checksheet.link/";
const url = "http://localhost:8080/";

export const getAccountData = async (account_id: string) => {
  const response = await axios.get<IAccount>(`${url}account/${account_id}`);
  return response.data;
};

export const loadUserData = async (id: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get<IFetchedData>(`${url}user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },
  });
  return response.data;
};
export async function fetchLogin(): Promise<string> {
  const response = await axios.get(`${url}user/login`);
  return response.data.loginUrl;
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

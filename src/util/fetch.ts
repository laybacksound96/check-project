import axios from "axios";
import { ICommanderData } from "../atoms/commander";
import { IFetchedAccount, IFetchedData } from "../atoms/fetchData";

const url2 = "https://www.checksheet.link/";
const url = "http://localhost:8080/";

export const getAccountData = async (account_id: string) => {
  const response = await axios.get<IFetchedAccount>(
    `${url}account/${account_id}`
  );
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
export const getCommander = async () => {
  const response = await axios.get<ICommanderData>(`${url}api/commander`);
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

export async function patchAccount(userId: string, accountOrderdata: string[]) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}user/accountOrder/${userId}`,
      {
        accountOrder: accountOrderdata,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return accountOrderdata;
  }
}
export async function patchCharacter(
  accountId: string,
  userId: string,
  characterOrderdata: string[]
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}account/characterOrder/${accountId}`,
      {
        characterOrder: characterOrderdata,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return characterOrderdata;
  }
}
export async function patchContents(
  accountId: string,
  userId: string,
  conentsOrderdata: string[]
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}account/contentsOrder/${accountId}`,
      {
        contentsOrder: conentsOrderdata,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return conentsOrderdata;
  }
}

import axios, { AxiosResponse } from "axios";
import {
  IFetchedAccount,
  IFetchedUserData,
  ISearchedData,
} from "../atoms/fetchData";
import { IAccountOrder, ICheck, IContent, IUser } from "../atoms/data";
import { accountData } from "./addAccount";
import { ICommander } from "../atoms/commander";

const url = "http://localhost:8080/";
// "http://localhost:8080/"
// "https://www.checksheet.link/"

export const getAccountData = async (account_id: string) => {
  const response = await axios.get<IFetchedAccount>(
    `${url}account/${account_id}`
  );
  return response.data;
};
let lastCallTimeout: any = null;
export async function search(
  name: string,
  setter: React.Dispatch<React.SetStateAction<ISearchedData | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(async () => {
    try {
      await axios
        .get<ISearchedData>(`${url}api/search?username=${name}`)
        .then((response: AxiosResponse<ISearchedData>) => {
          setter(response.data);
          setLoading(false);
        });
      lastCallTimeout = null;
      return;
    } catch (error) {
      throw error;
    }
  }, 1000);
}
export const loadUserData = async (id: string) => {
  const response = await axios.get<IUser>(`${url}user/${id}`);
  return response.data;
};
export const getCommander = async () => {
  const response = await axios.get<ICommander[]>(`${url}api/commander`);
  return response.data;
};
export async function fetchLogin(): Promise<string> {
  const response = await axios.get(`${url}user/login`);
  return response.data.loginUrl;
}

export interface fetchedData {
  CharacterClassName: string;
  CharacterLevel: number;
  CharacterName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  ServerName: string;
}
export async function fetchSearchAccount(
  inputValue: string
): Promise<fetchedData[]> {
  try {
    const response = await axios.post<fetchedData[]>(
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
export async function postAccount(accountData: accountData) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${url}account`,
      {
        accountData,
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
    return null;
  }
}
export async function patchAccountOrder(accountOrderdata: string[]) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}user/accountOrder`,
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

export async function patchContent(
  accountId: string,
  userId: string,
  data: IContent,
  contentIndex: number
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}account/content/${accountId}`,
      {
        data,
        user_id: userId,
        contentIndex,
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
    return data;
  }
}
export async function patchChecks(
  accountId: string,
  userId: string,
  checks: ICheck[]
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}account/checks/${accountId}`,
      {
        checks: checks,
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
    return checks;
  }
}
export async function deleteAccount(accountId: string) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(`${url}account/${accountId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    return;
  }
}
export async function uncheckAll() {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}user/checks/uncheckAll`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return;
  }
}

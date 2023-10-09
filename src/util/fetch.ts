import axios, { AxiosResponse } from "axios";
import { ISearchedData } from "../atoms/fetchData";
import { IAccount, ICharacters, ICheck, IContents, IUser } from "../atoms/data";
import { ICommander } from "../atoms/commander";
import { INewAccountData } from "./addAccount";
const url = process.env.REACT_APP_BACKEND_DOMAIN;

interface IAccountData {
  account: IAccount;
  characters: ICharacters;
  contents: IContents;
}
export const getAccountData = async (account_id: string) => {
  const response = await axios.get<IAccountData>(`${url}account/${account_id}`);
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
export async function postAccount(accountData: INewAccountData) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${url}account`, accountData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
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
export async function patchOrder(
  account: string,
  orderData: { name: string; order: string[] }
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<IAccount>(
      `${url}account/Order/${account}`,
      orderData,
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
export async function patchContent(
  content_id: string,
  key: string,
  value: any
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}contents/setting/${content_id}`,
      { [`${key}`]: value },
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
export async function patchChecks(accountId: string, checks: ICheck[]) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}account/checks/${accountId}`,
      {
        checks: checks,
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
export async function patchGoldContents(
  character_id: string,
  name: string,
  isGoldCharacter: boolean
) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}character/goldCharacter/${character_id}`,
      { name, isGoldCharacter },
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

import axios from "axios";
import { IAccount, ICharacters, ICheck, IContents } from "../atoms/data";
import { INewAccountData } from "../util/addAccount";

export const url = process.env.REACT_APP_BACKEND_DOMAIN;
export interface fetchedData {
  CharacterClassName: string;
  CharacterLevel: number;
  CharacterName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  ServerName: string;
}
interface IAccountData {
  account: IAccount;
  characters: ICharacters;
  contents: IContents;
}
export const getAccountData = async (account_id: string) => {
  const response = await axios.get<IAccountData>(`${url}account/${account_id}`);
  return response.data;
};

// needs Auth
export async function postAccount(user_id: string, accountData: INewAccountData) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${url}account/${user_id}`, accountData, {
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
export async function patchOrder(user_id: string, account: string, orderData: { name: string; order: string[] }) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<IAccount>(`${url}account/${user_id}/Order/${account}`, orderData, {
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
export async function patchChecks(user_id: string, accountId: string, checks: ICheck[]) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}account/${user_id}/checks/${accountId}`,
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
export async function deleteAccount(user_id: string, accountId: string) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(`${url}account/${user_id}/${accountId}`, {
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

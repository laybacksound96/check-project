import axios from "axios";
import { IUser } from "../atoms/data";
import { url } from "./account";

export const loadUserData = async (id: string) => {
  const response = await axios.get<IUser>(`${url}user/${id}`);
  return response.data;
};
export async function fetchLogin(): Promise<string> {
  const response = await axios.get(`${url}user/login`);
  return response.data.loginUrl;
}

// needs Auth
export async function uncheckAll(user_id: string) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}user/${user_id}/uncheckChecks`,
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
export async function patchAccountOrder(user_id: string, accountOrderdata: string[]) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<string[]>(
      `${url}user/${user_id}/accountOrder`,
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

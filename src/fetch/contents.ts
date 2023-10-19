import axios from "axios";
import { url } from "./account";
import { ICharacters, IContents } from "../atoms/data";

export async function patchContent(user_id: string, content_id: string, key: string, value: any) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<IContents>(
      `${url}contents/${user_id}/setting/${content_id}`,
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
export async function patchFalseSettings(user_id: string, owner_id: string, characterName: string) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch<{ contents: IContents; character: ICharacters }>(
      `${url}contents/${user_id}/falseGoldContentsAll`,
      { characterName, owner_id },
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

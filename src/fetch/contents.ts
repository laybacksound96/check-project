import axios from "axios";
import { url } from "./account";
import { IContents } from "../atoms/data";

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

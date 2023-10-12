import axios from "axios";
import { url } from "./account";

export async function patchGoldContents(user_id: string, character_id: string, name: string, isGoldCharacter: boolean) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${url}character/${user_id}/goldCharacter/${character_id}`,
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

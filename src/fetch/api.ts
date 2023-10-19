import axios, { AxiosResponse } from "axios";
import { ISearchedData } from "../atoms/fetchData";
import { ICommander } from "../atoms/commander";
import { fetchedData, url } from "./account";

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
      await axios.get<ISearchedData>(`${url}api/search?username=${name}`).then((response: AxiosResponse<ISearchedData>) => {
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
export const getCommander = async () => {
  const response = await axios.get<ICommander[]>(`${url}api/commander`);
  return response.data;
};
export async function fetchSearchAccount(inputValue: string): Promise<fetchedData[]> {
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

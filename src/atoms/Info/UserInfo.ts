import { atom } from "recoil";
import { IFetchedData } from "../../util/fetch";

export const UserInfo = atom<IFetchedData>({
  key: "UserInfo",
  default: {
    user_id: "",
    user_name: "",
    global_name: "",
    discriminator: "",
    banner_color: "",
  },
});

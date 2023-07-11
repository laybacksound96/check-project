import { IData } from "../CustomHooks/Login/useSetAllAtoms";
import { patchUser } from "./fetch";

let lastCallTimeout: any = null;

function patchData(id: string, data: IData) {
  const { accountOrder } = data;
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(() => {
    if (accountOrder.length <= 0) return;
    patchUser(id, data);
    lastCallTimeout = null;
  }, 5000);
}

export default patchData;

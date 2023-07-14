import { IAllAtoms } from "../page/Dashboard";
import { patchUser } from "./fetch";

let lastCallTimeout: any = null;

function patchData(id: string, data: IAllAtoms) {
  const { accountOrder } = data;
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(async () => {
    if (accountOrder.length <= 0) return;
    const res = await patchUser(id, data);
    lastCallTimeout = null;
    console.log(res);
  }, 5000);
}

export default patchData;

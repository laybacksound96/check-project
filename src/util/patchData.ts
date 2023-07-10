import { IData } from "../CustomHooks/Login/useSetAllAtoms";

let lastCallTimeout: any = null;

function patchData(data: IData) {
  const { accountOrder } = data;
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(() => {
    if (accountOrder.length <= 0) return;
    console.log("Final A function call");
    lastCallTimeout = null;
  }, 5000);
}

export default patchData;

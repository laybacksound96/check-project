import { IData } from "../CustomHooks/Login/useSetAllAtoms";

let lastCallTimeout: any = null;

function patchData(data: IData) {
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(() => {
    console.log("Final A function call");
    lastCallTimeout = null;
  }, 5000);
}

export default patchData;

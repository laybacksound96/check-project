import { ISync } from "../page/Dashboard";
import { patchUser } from "./fetch";

let lastCallTimeout: any = null;

function patchData(
  id: string,
  data: any,
  setIsSync: React.Dispatch<React.SetStateAction<ISync>>
) {
  setIsSync(null);
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(async () => {
    setIsSync("inprogress");
    const res = await patchUser(id, data);
    if (res === 200) setIsSync("success");
    if (res === 404 || res === 401) setIsSync("error");
    lastCallTimeout = null;
  }, 5000);
}

export default patchData;

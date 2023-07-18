import { IAllAtoms, ISync } from "../page/Dashboard";
import { patchUser } from "./fetch";

let lastCallTimeout: any = null;

function patchData(
  id: string,
  data: IAllAtoms,
  setIsSync: React.Dispatch<React.SetStateAction<ISync>>
) {
  setIsSync(null);
  if (lastCallTimeout) {
    clearTimeout(lastCallTimeout);
  }

  lastCallTimeout = setTimeout(async () => {
    setIsSync(false);
    const res = await patchUser(id, data);
    if (res === "OK") setIsSync(true);
    lastCallTimeout = null;
  }, 5000);
}

export default patchData;

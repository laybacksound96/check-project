import { ICheckBoxconfig, IContents } from "../../../atoms";
import { IContentsFrequency } from "../HeaderBox/Contents";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContents
) => {
  const resultObj: IContentsFrequency = {};
  console.log(Contents);
  function frequencyCounter(Accounts: any) {
    for (let key in Accounts) {
      if (Accounts[key] && typeof Accounts[key].isCleared !== "boolean") {
        frequencyCounter(Accounts[key]);
      } else {
        if (Accounts[key].isVisible === false) continue;
        if (resultObj[key] === undefined) resultObj[key] = 0;
        if (Accounts[key].isCleared === false) resultObj[key]++;
      }
    }
  }
  frequencyCounter(Accounts);

  return resultObj;
};

export default CalculateCheckbox;

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

  // function recursive(obj){
  //   let result =[]
  //   let a = obj.Gates[0].Gate_No
  //   let b
  //   let Diff = obj.Gates[0].Difficulty

  //   for(let i in obj.Gates){
  //       const Difficulty = obj.Gates[i].Difficulty
  //       if(Diff!==Difficulty){
  //           if(+a===+i){
  //                result.push(`${Diff}${a}`)
  //               continue
  //           }
  //           result.push(`${Diff}${a}-${i}`)
  //           a = +i+1
  //       }
  //       Diff=obj.Gates[i].Difficulty
  //       b=+i+1
  //   }
  //   result.push(`${Diff}${a}-${b}`)
  //   return result
  // }
  frequencyCounter(Accounts);

  return resultObj;
};

export default CalculateCheckbox;

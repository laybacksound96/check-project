import { ICheckBoxconfig, IContents } from "../../../atoms";
import { IContentsFrequency } from "../HeaderBox/Contents";
import CalculateGateDifficulty from "./CalculateGateDifficulty";

export const CalculateCheckbox = (
  Accounts: ICheckBoxconfig,
  Contents: IContents
) => {
  console.log("디버깅디버깅디버깅디버깅디버깅디버깅");
  console.log("=================================");
  console.log(Accounts);
  console.log(Contents);
  console.log("=================================");
  console.log("디버깅디버깅디버깅디버깅디버깅디버깅");
  const resultObj: IContentsFrequency = {};

  for (const CharacterName in Accounts) {
    for (const ContentName in Contents) {
      const state = Accounts[CharacterName][ContentName];
      if (CharacterName === "DK너구리") {
        console.log(state);
      }
      if (state.isVisible === false) continue;
      if (Contents[ContentName].type === "Default") {
        if (state.Gates === undefined) continue;
        const gates = CalculateGateDifficulty(state.Gates);
        const Key = `${ContentName}_${gates.join("_")}`;
        if (resultObj[Key] === undefined) {
          resultObj[Key] = {
            Frequency: 1,
            GateState: gates,
            ContentsName: ContentName,
            ContentsOwner: [CharacterName],
          };
        } else {
          if (state.isCleared === false) {
            resultObj[Key].Frequency++;
          }
          resultObj[Key].ContentsOwner.push(CharacterName);
        }
      }
      if (Contents[ContentName].type === "Custom") {
        if (resultObj[ContentName] === undefined) {
          resultObj[ContentName].Frequency = 0;
          resultObj[ContentName].GateState = [];
          resultObj[ContentName].ContentsName = ContentName;
        }
        if (state.isCleared === false) resultObj[ContentName].Frequency++;
      }
    }
  }

  console.log(resultObj);
  return resultObj;
};

export default CalculateCheckbox;

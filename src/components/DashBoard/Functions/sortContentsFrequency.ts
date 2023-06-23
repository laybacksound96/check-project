import { IContentsFrequency } from "../../../atoms/userSetting";
import { IData } from "../../Ui/Modal/ModalContents/functions/makeActivatedAndDifficulty";
import commander from "../../Ui/Modal/ModalContents/functions/commander.json";

const sortContentsFrequency = (
  contentsFrequency: IContentsFrequency
): string[] => {
  const keys = Object.keys(contentsFrequency);
  const commanderData: IData = commander;

  let reverseData: string[] = [];
  for (let i = Object.keys(commanderData).length; i > 0; i--) {
    reverseData.push(Object.keys(commanderData)[i - 1]);
  }

  keys.sort((a, b) => {
    const aIndex = reverseData.indexOf(contentsFrequency[a].ContentsName);
    const bIndex = reverseData.indexOf(contentsFrequency[b].ContentsName);
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    const aIsHard = a.includes("_hard");
    const bIsHard = b.includes("_hard");
    if (aIsHard && !bIsHard) {
      return -1;
    } else if (!aIsHard && bIsHard) {
      return 1;
    }

    return 0;
  });
  return keys;
};

export default sortContentsFrequency;

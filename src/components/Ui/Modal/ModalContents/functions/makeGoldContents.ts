import { IGoldContents } from "../../../../../atoms/Settings/ContentSetting";

function makeGoldContents(GoldArray: IGoldContents[]) {
  const GoldContents = [];
  for (let index in GoldArray) {
    if (+index > 2) break;
    GoldContents.push(GoldArray[index]);
  }
  return GoldContents;
}

export default makeGoldContents;

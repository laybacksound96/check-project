import {
  ICheckBoxconfig,
  IConfigObject,
  IContents,
  IGates,
} from "../../../../../atoms";
import { IFetchedCharacter } from "../AddAccount";
import CountGates from "./CountGates";

const MakeCheckboxState = (Account: IFetchedCharacter[], Column: IContents) => {
  const result: ICheckBoxconfig = {};
  if (!Account || !Account.length) return result;
  for (let index in Account) {
    const { CharacterName } = Account[index];
    const { ItemMaxLevel } = Account[index];
    result[`${CharacterName}`] = {};
    for (let content in Column) {
      const gates = [];
      const gateCount = CountGates(content);
      for (let i = 1; i > gateCount; i++) {
        const initialGate: IGates = {
          Gate_No: i,
        };
        gates.push({});
      }
      const InitialConfig: IConfigObject = {
        isCleared: false,
        isVisible: true,
        Gates: [],
      };
    }
  }
  return result;
};
export default MakeCheckboxState;

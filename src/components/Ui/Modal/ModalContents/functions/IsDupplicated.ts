import { ICharacterState } from "../../../../../atoms/atoms";

const IsDupplicated = (
  name: string,
  accountState: ICharacterState
): boolean => {
  const Characters = [];
  for (let elem in accountState) {
    Characters.push(...Object.keys(accountState[elem]));
  }
  for (let index in Characters) {
    if (Characters[index] === name) return true;
  }
  return false;
};

export default IsDupplicated;

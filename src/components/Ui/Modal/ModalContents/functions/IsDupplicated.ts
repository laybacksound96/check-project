import { ICharacterState } from "../../../../../atoms/atoms";

const IsDupplicated = (
  name: string,
  accountState: ICharacterState
): boolean => {
  if (name in accountState) return true;
  return false;
};

export default IsDupplicated;

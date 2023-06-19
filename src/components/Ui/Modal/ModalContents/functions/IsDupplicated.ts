import { IAccountState } from "../../../../../atoms/atoms";

const IsDupplicated = (name: string, accountState: IAccountState): boolean => {
  for (let accountName in accountState) {
    if (name in accountState[accountName]) return true;
  }
  return false;
};

export default IsDupplicated;

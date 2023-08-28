import { SetterOrUpdater } from "recoil";
import { IAccounts } from "../../../atoms/data";
import { IFetchedData, fetchSearchAccount } from "../../../util/fetch";

const refreshLevel = (
  userData: IAccounts[],
  setAccount: SetterOrUpdater<IAccounts[]>
) => {
  const accountName = userData[0].characters[0].characterName;

  console.log(userData[0].characters);
  fetchSearchAccount(accountName).then((data) => {
    console.log(data);
  });
};

export default refreshLevel;

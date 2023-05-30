import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { InsertAccountHandler } from "../../../DashBoard/Functions/InsertAccount";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountOrder,
  CheckboxesState,
  ContentsState,
} from "../../../../atoms";
import { fetchSearchAccount } from "../../../../util/fetch";
import { useState } from "react";

const AddAccount = () => {
  const [accounts, setAccounts] = useRecoilState(CheckboxesState);
  const Column = useRecoilValue(ContentsState);
  const [accountOrder, SetAccountOrder] = useRecoilState(AccountOrder);

  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const AddAccountHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    fetchSearchAccount(inputValue);
    // setAccounts((prev) => {
    //   const copiedPrev = { ...prev };
    //   copiedPrev[newMockingAccountName] = {};

    //   for (let index in MakedMockingAccount.Characters) {
    //     const CharacterName =
    //       MakedMockingAccount.Characters[index].CharacterName;
    //     const newCharacterName = CharacterName;
    //     const columns = Object.keys(Column);
    //     copiedPrev[newMockingAccountName][newCharacterName] = {};

    //     for (let index in columns) {
    //       copiedPrev[newMockingAccountName][newCharacterName][columns[index]] =
    //         false;
    //     }
    //   }
    //   return copiedPrev;
    // });
  };
  return (
    <>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>Settings</h1>
      </Header>
      <form>
        <div>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button type="submit" onClick={AddAccountHandler}>
            검색
          </button>
        </div>
        <button type="button">추가</button>
      </form>
    </>
  );
};

export default AddAccount;

import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchSearchAccount } from "../../../../util/fetch";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";
import SortByLevel from "./functions/SortByLevel";
import useModal from "../../../../CustomHooks/Modal/useModal";

import { CharacterInfo } from "../../../../atoms/Info/CharacterInfo";
import { CharacterSetting } from "../../../../atoms/Settings/CharacterSetting";
import { makeNewAccount } from "./functions/AddAccountFuntions";
import IsDupplicated from "./functions/Validation/IsDupplicated";
import IsInValidName from "./functions/Validation/IsValidName";
import { ContentSetting } from "../../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../../atoms/Settings/Gates";
import {
  CharacterOrder,
  ContentsOrder,
  AccountOrder,
} from "../../../../atoms/Settings/Orders";
import makeNewContentOrder from "./functions/makeNewContentOrder";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  form {
    display: flex;
    justify-content: start;
    width: 100%;
    margin-bottom: 5px;
    input {
      margin: 0 10px;
    }
  }
`;
const Button = styled.button`
  margin-top: 5px;
`;
const Error = styled.p`
  margin-left: 5px;
  margin-top: 5px;
  color: #bb002caa;
`;
export interface IFetchedCharacter {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
}

interface IError {
  message: string;
}

const AddAccount = () => {
  const [characterInfo, setCharacterInfo] = useRecoilState(CharacterInfo);
  const setCharacterSetting = useSetRecoilState(CharacterSetting);
  const setContentSetting = useSetRecoilState(ContentSetting);
  const setGates = useSetRecoilState(Gates);
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const setContentsOrder = useSetRecoilState(ContentsOrder);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const [, closeModal] = useModal();
  const [inputValue, setInputValue] = useState("");
  const [fetchedData, setFetchedData] = useState<IFetchedCharacter[]>([]);
  const [error, setError] = useState<IError | undefined>();

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (IsDupplicated(inputValue, characterInfo)) {
      setError({ message: "같은 이름이 이미 시트에 있어요" });
      return;
    }
    try {
      const data = await fetchSearchAccount(inputValue);
      if (!data) {
        setError({ message: "서버에 존재하지 않는 이름이에요" });
        return;
      }
      setFetchedData(SortByLevel(data));
    } catch (error) {
      setError({ message: "로스트아크 서버가 점검중이에요" });
      return;
    }
  };
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    setFetchedData([]);
    const name = event.target.value;
    if (IsInValidName(name)) {
      setError({ message: "검색하려는 이름이 유효하지 않아요" });
    }
    setInputValue(() => name);
  };
  const AddAccountHandler = (data: IFetchedCharacter[]) => {
    if (data.length === 0) return;
    const AccountName = data[0].CharacterName;
    const { accountInfo, accountSetting, contentSetting, gates } =
      makeNewAccount(data);
    const CharacterOrder = Object.keys(accountSetting).filter(
      (prev) => accountSetting[prev].isVisible
    );
    setCharacterInfo((prev) => {
      return { ...prev, [`${AccountName}`]: accountInfo };
    });
    setCharacterSetting((prev) => {
      return { ...prev, [`${AccountName}`]: accountSetting };
    });
    setContentSetting((prev) => {
      return { ...prev, [`${AccountName}`]: contentSetting };
    });
    setGates((prev) => {
      return { ...prev, [`${AccountName}`]: gates };
    });
    setAccountOrder((prev) => [...prev, AccountName]);
    setCharacterOrder((prev) => {
      return {
        ...prev,
        [`${AccountName}`]: CharacterOrder,
      };
    });
    setContentsOrder((prev) => {
      return {
        ...prev,
        [`${AccountName}`]: makeNewContentOrder(
          CharacterOrder,
          contentSetting,
          AccountName
        ),
      };
    });
    closeModal();
  };

  return (
    <Container>
      <form>
        <Input
          type="text"
          name="search"
          isDisabled={error !== undefined}
          onChange={HandleChange}
          value={inputValue}
          placeholder="캐릭터 명을 입력한 뒤 검색"
        />
        <button
          type="submit"
          onClick={SearchAccountHandler}
          disabled={inputValue.length === 0 || error !== undefined}
        >
          검색
        </button>
      </form>
      {error && <Error>{error.message}</Error>}
      {!error && <CharacterContainer Characters={fetchedData} />}
      <Button
        type="button"
        onClick={() => AddAccountHandler(fetchedData)}
        disabled={fetchedData.length === 0 || error !== undefined}
      >
        추가
      </Button>
    </Container>
  );
};

export default AddAccount;

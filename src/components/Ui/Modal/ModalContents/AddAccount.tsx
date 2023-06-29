import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchSearchAccount } from "../../../../util/fetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";
import IsDisabled from "./functions/Validation/IsDisabled";
import SortByLevel from "./functions/SortByLevel";
import useModal from "../../../../CustomHooks/Modal/useModal";

import { CharacterInfo } from "../../../../atoms/Info/CharacterInfo";
import { CharacterSetting } from "../../../../atoms/Settings/CharacterSetting";
import { makeNewAccount } from "./functions/AddAccountFuntions";
import IsDupplicated from "./functions/Validation/IsDupplicated";
import IsInValidName from "./functions/Validation/IsValidName";
import { ContentSetting } from "../../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../../atoms/Settings/Gates";
import { GoldIncome } from "../../../../atoms/Settings/GoldIncome";
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
interface IOptions {
  fetchedCharacters: IFetchedCharacter[];
  isDupplicated: boolean;
  isNull: boolean;
  isInValid: boolean;
}

const AddAccount = () => {
  const [characterInfo, setCharacterInfo] = useRecoilState(CharacterInfo);
  const setCharacterSetting = useSetRecoilState(CharacterSetting);
  const setContentSetting = useSetRecoilState(ContentSetting);
  const setGates = useSetRecoilState(Gates);
  const setGoldIncome = useSetRecoilState(GoldIncome);
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const setContentsOrder = useSetRecoilState(ContentsOrder);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const [, closeModal] = useModal();
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [{ fetchedCharacters, isDupplicated, isNull, isInValid }, setOption] =
    useState<IOptions>({
      fetchedCharacters: [],
      isDupplicated: false,
      isNull: false,
      isInValid: false,
    });

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (IsDupplicated(inputValue, characterInfo)) {
      return setOption((prev) => ({ ...prev, isDupplicated: true }));
    }
    const data = await fetchSearchAccount(inputValue);
    setOption((prev) => ({
      ...prev,
      fetchedCharacters: SortByLevel(data) ?? [],
      isNull: data === null,
    }));
  };
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setInputValue(() => name);
    setOption(() => ({
      fetchedCharacters: [],
      isInValid: IsInValidName(name),
      isDupplicated: false,
      isNull: false,
    }));
  };
  const AddAccountHandler = () => {
    const AccountName = fetchedCharacters[0].CharacterName;
    const data = SortByLevel(fetchedCharacters);
    const { accountInfo, accountSetting, GoldIncome, contentSetting, gates } =
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
    setGoldIncome((prev) => {
      return { ...prev, [`${AccountName}`]: GoldIncome };
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

  useEffect(() => {
    setIsDisabled(() => IsDisabled(isDupplicated, isNull, isInValid));
  }, [isDupplicated, isNull, isInValid]);
  return (
    <Container>
      <form>
        <Input
          type="text"
          name="search"
          isDisabled={isDisabled}
          onChange={HandleChange}
          value={inputValue}
          placeholder="캐릭터 명을 입력한 뒤 검색"
        />
        <button
          type="submit"
          onClick={SearchAccountHandler}
          disabled={inputValue.length === 0 || isDisabled}
        >
          검색
        </button>
      </form>
      {isInValid && <Error>검색하려는 이름이 유효하지 않아요</Error>}
      {isDupplicated && <Error>같은 이름이 이미 일정에 있어요</Error>}
      {isNull && <Error>서버에 존재하지 않는 이름이에요</Error>}
      <CharacterContainer
        isDisabled={isDisabled}
        Characters={fetchedCharacters}
      />
      <Button
        type="button"
        onClick={AddAccountHandler}
        disabled={fetchedCharacters.length === 0 || isDisabled}
      >
        추가
      </Button>
    </Container>
  );
};

export default AddAccount;

import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchSearchAccount } from "../../../../util/fetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";
import IsInValidName from "./functions/IsValidName";
import IsDisabled from "./functions/IsDisabled";
import IsDupplicated from "./functions/IsDupplicated";
import SortByLevel from "./functions/SortByLevel";
import useModal from "../../../../CustomHooks/Modal/useModal";

import { CharacterInfo } from "../../../../atoms/Info/CharacterInfo";
import { CharacterSetting } from "../../../../atoms/Settings/CharacterSetting";
import { makeNewAccount } from "./NewFuctions/AddAccountFuntions";

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
    const { accountInfo, accountSetting } = makeNewAccount(data);

    setCharacterInfo((prev) => {
      return { ...prev, [`${AccountName}`]: accountInfo };
    });
    setCharacterSetting((prev) => {
      return { ...prev, [`${AccountName}`]: accountSetting };
    });
    console.log(makeNewAccount(data));
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

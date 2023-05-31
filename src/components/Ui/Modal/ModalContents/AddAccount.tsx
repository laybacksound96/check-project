import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccountOrder,
  AccountState,
  CheckboxesState,
  ContentsState,
  ICharacterState,
  ICheckCharacters,
  ModalState,
} from "../../../../atoms";
import { fetchSearchAccount } from "../../../../util/fetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";

import IsInValidName from "./functions/IsValidName";
import IsDisabled from "./functions/IsDisabled";
import IsDupplicated from "./functions/IsDupplicated";
import MakeAccountState from "./functions/MakeAccountState";
import MakeCheckboxState from "./functions/MakeCheckboxState";
import SortByLevel from "./functions/SortByLevel";

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
  const setModalState = useSetRecoilState(ModalState);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const [checkboxesState, setCheckboxesState] = useRecoilState(CheckboxesState);
  const [accountState, setAccountState] = useRecoilState(AccountState);
  const Column = useRecoilValue(ContentsState);

  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [option, setOption] = useState<IOptions>({
    fetchedCharacters: [],
    isDupplicated: false,
    isNull: false,
    isInValid: false,
  });
  const { fetchedCharacters, isDupplicated, isNull, isInValid } = option;

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (IsDupplicated(inputValue, accountState)) {
      return setOption((prev) => ({ ...prev, isDupplicated: true }));
    }
    const data = await fetchSearchAccount(inputValue);
    setOption((prev) => ({
      ...prev,
      fetchedCharacters: data ?? [],
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
    const Character = SortByLevel(fetchedCharacters);
    const AccountOwner = Character[0].CharacterName;
    setAccountState((prev) => {
      const copiedPrev = {
        ...prev,
        [`${AccountOwner}`]: MakeAccountState(Character),
      };
      return copiedPrev;
    });
    setCheckboxesState((prev) => {
      const copiedPrev = {
        ...prev,
        [`${AccountOwner}`]: MakeCheckboxState(Character, Column),
      };
      return copiedPrev;
    });
    setAccountOrder((prev) => [...prev, AccountOwner]);

    setModalState((prev) => ({ ...prev, isModalOpen: false }));
  };

  useEffect(() => {
    setIsDisabled(() => IsDisabled(isDupplicated, isNull, isInValid));
  }, [isDupplicated, isNull, isInValid]);

  useEffect(() => {
    console.log("called for Debug------");
    console.log(option);
    console.log("----------------------");
  }, [option]);

  return (
    <>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>계정 추가하기</h1>
      </Header>
      <Container>
        <form>
          <Input
            type="text"
            name="search"
            isDisabled={isDisabled}
            onChange={HandleChange}
            value={inputValue}
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
    </>
  );
};

export default AddAccount;

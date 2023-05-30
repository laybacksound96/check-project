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
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";
import AccountDataSorter from "./functions/AccountDataSorter";

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
  inputValue: string;
  isdisabled: boolean;
  isDupplicated: boolean;
  isNull: boolean;
}

const AddAccount = () => {
  const setCheckboxesState = useSetRecoilState(CheckboxesState);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const setModalState = useSetRecoilState(ModalState);
  const [accountState, setAccountState] = useRecoilState(AccountState);
  const Column = useRecoilValue(ContentsState);

  const [option, setOption] = useState<IOptions>({
    fetchedCharacters: [],
    inputValue: "",
    isdisabled: true,
    isDupplicated: false,
    isNull: false,
  });
  const { fetchedCharacters, inputValue, isdisabled, isDupplicated, isNull } =
    option;

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("asdsd");

    for (let accountName in accountState) {
      const characters = Object.keys(accountState[accountName]);
      characters.map((character) => {
        if (character === inputValue) {
          setOption((prev) => ({
            ...prev,
            isDupplicated: true,
            isdisabled: true,
          }));
        }
        return null;
      });
    }
    const data = await fetchSearchAccount(inputValue);
    if (data === null) {
      setOption((prev) => ({
        ...prev,
        fetchedCharacters: AccountDataSorter(prev.fetchedCharacters),
      }));

      return;
    }
    setOption((prev) => ({
      ...prev,
      isNull: true,
      isdisabled: true,
    }));
  };
  const AddAccountHandler = () => {
    const AccountOwner = fetchedCharacters[0].CharacterName;
    const newCheckAccount: ICheckCharacters = {};
    const newAccountState: ICharacterState = {};

    fetchedCharacters.map((Character) => {
      const name = Character.CharacterName;
      const level = parseFloat(Character.ItemMaxLevel.replace(",", ""));
      const server = Character.ServerName;
      const className = Character.CharacterClassName;

      newAccountState[name] = {
        ServerName: server,
        CharacterClassName: className,
        ItemMaxLevel: level,
      };
      newCheckAccount[name] = {};
      for (let content in Column) {
        newCheckAccount[name][content] = false;
      }
      return null;
    });

    setAccountOrder((prev) => [...prev, AccountOwner]);
    setCheckboxesState((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev[`${AccountOwner}`] = newCheckAccount;
      return copiedPrev;
    });
    setAccountState((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev[`${AccountOwner}`] = newAccountState;
      return copiedPrev;
    });

    setModalState((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    input === ""
      ? setOption((prev) => ({ ...prev, isdisabled: true }))
      : setOption((prev) => ({ ...prev, isdisabled: false }));
    setOption((prev) => ({ ...prev, isDupplicated: false, inputValue: input }));
  };
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
            isDupplicated={isDupplicated}
            value={inputValue}
            onChange={handleChange}
            isNull={isNull}
          />
          <button
            type="submit"
            onClick={SearchAccountHandler}
            disabled={isdisabled}
          >
            검색
          </button>
        </form>
        {isDupplicated && <Error>같은 이름이 이미 일정에 있어요</Error>}
        {isNull && <Error>유효하지 않은 이름이에요</Error>}
        <CharacterContainer
          isDupplicated={isDupplicated}
          Characters={fetchedCharacters}
        />
        {
          <Button
            type="button"
            onClick={AddAccountHandler}
            disabled={isdisabled}
          >
            추가
          </Button>
        }
      </Container>
    </>
  );
};

export default AddAccount;

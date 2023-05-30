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
const AddAccount = () => {
  const setCheckboxesState = useSetRecoilState(CheckboxesState);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const setModalState = useSetRecoilState(ModalState);
  const [accountState, setAccountState] = useRecoilState(AccountState);
  const Column = useRecoilValue(ContentsState);
  const [fetchedCharacters, setFetchedCharacters] = useState<
    IFetchedCharacter[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isdisabled, setIsdisabled] = useState(true);
  const [isDupplicated, setIsDupplicated] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    for (let accountName in accountState) {
      const chracters = Object.keys(accountState[accountName]);
      chracters.map((chracter) => {
        if (chracter === inputValue) {
          setIsDupplicated(true);
          setIsdisabled(true);
        }
        return null;
      });
    }
    const data = await fetchSearchAccount(inputValue);
    if (data === null) {
      setIsNull(true);
      setIsdisabled(true);
      return;
    }
    setFetchedCharacters(() => {
      const copiedData: IFetchedCharacter[] = [...data];
      copiedData.sort((a, b) => {
        const itemAvgLevelA = parseFloat(a.ItemAvgLevel.replace(",", ""));
        const itemAvgLevelB = parseFloat(b.ItemAvgLevel.replace(",", ""));

        if (itemAvgLevelA > itemAvgLevelB) {
          return -1; // a를 b보다 앞으로 정렬
        } else if (itemAvgLevelA < itemAvgLevelB) {
          return 1; // b를 a보다 앞으로 정렬
        } else {
          return 0; // 정렬 순서 변경 없음
        }
      });
      return copiedData;
    });
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
  console.log("fetchedCharacters");
  console.log(fetchedCharacters);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDupplicated(false);
    event.target.value === "" ? setIsdisabled(true) : setIsdisabled(false);
    setInputValue(event.target.value);
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
        <Button type="button" onClick={AddAccountHandler} disabled={isdisabled}>
          추가
        </Button>
      </Container>
    </>
  );
};

export default AddAccount;

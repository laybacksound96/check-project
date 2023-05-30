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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const CharacterCard = styled.div`
  width: auto;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: start;
  padding-left: 10px;
  align-items: center;
  border-radius: 10px;
  margin: 3px 3px;
`;

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
const AddAccount = () => {
  interface IFetchedCharacter {
    ServerName: string;
    CharacterName: string;
    CharacterLevel: number;
    CharacterClassName: string;
    ItemAvgLevel: string;
    ItemMaxLevel: string;
  }
  const [accounts, setAccounts] = useRecoilState(CheckboxesState);
  const Column = useRecoilValue(ContentsState);
  const [accountOrder, SetAccountOrder] = useRecoilState(AccountOrder);
  const [fetchedCharacters, setFetchedCharacters] = useState<
    IFetchedCharacter[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    const data = await fetchSearchAccount(inputValue);
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
  const AddAccountHandler = (event: React.MouseEvent) => {
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
  useEffect(() => console.log(fetchedCharacters), [fetchedCharacters]);
  return (
    <>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>계정 추가하기</h1>
      </Header>
      <Container>
        <form>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button type="submit" onClick={SearchAccountHandler}>
            검색
          </button>
        </form>
        {fetchedCharacters.map(
          (character, index) =>
            index < 3 && (
              <CharacterCard key={index}>
                {character.CharacterName}
              </CharacterCard>
            )
        )}
        {fetchedCharacters.length > 3 && <CharacterCard>...</CharacterCard>}
        <Button type="button" onClick={AddAccountHandler}>
          추가
        </Button>
      </Container>
    </>
  );
};

export default AddAccount;

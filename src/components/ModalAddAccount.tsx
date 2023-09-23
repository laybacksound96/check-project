import { fetchSearchAccount, postAccount } from "../util/fetch";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./ModalAddContent";
import CharacterContainer from "./Ui/Modal/ModalContents/components/CharacterContainer";
import { makeDataResult } from "../util/addAccount";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import SortByLevel from "./Functions/SortByLevel";
import { UserState } from "../atoms/fetchData";
import ModalContainer from "./ModalContainer";
import { ModalAddAcount } from "../atoms/modal";
import { AccountOrder } from "../atoms/data";
import { IsDuplicated, IsInValidName } from "./Functions/handleErrors";
import { CommanderData } from "../atoms/commander";

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

const ModalAddAccount = () => {
  const [error, setError] = useState<IError | undefined>();
  const closeModal = useSetRecoilState(ModalAddAcount);
  const [account, setAccount] = useRecoilState(AccountOrder);
  const commanderData = useRecoilValue(CommanderData);
  const [inputValue, setInputValue] = useState("");
  const [fetchedData, setFetchedData] = useState<IFetchedCharacter[]>([]);
  const accountOrder = useRecoilValue(AccountOrder);
  const userState = useRecoilValue(UserState);
  const SearchAccountHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (IsDuplicated(inputValue, accountOrder)) {
      setError({ message: "같은 계정이 이미 시트에 있어요" });
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
    const { characterOrder, characters, contents, contentsOrder } =
      makeDataResult(data, commanderData);
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const newAccount = {
        characterOrder,
        characters,
        contents,
        contentsOrder,
        _id: characterOrder[0],
        checks: [],
      };
      copiedPrev.push(newAccount);
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        postAccount(userId, newAccount);
      }
      return copiedPrev;
    });
    closeModal(false);
  };

  return (
    <ModalContainer onClose={() => closeModal(false)} title={"계정 추가하기"}>
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
    </ModalContainer>
  );
};

export default ModalAddAccount;

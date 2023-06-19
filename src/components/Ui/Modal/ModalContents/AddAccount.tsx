import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccountState,
  CheckBoxConfig,
  ContentsState,
} from "../../../../atoms/atoms";
import { fetchSearchAccount } from "../../../../util/fetch";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "./AddContent";
import CharacterContainer from "./components/CharacterContainer";

import IsInValidName from "./functions/IsValidName";
import IsDisabled from "./functions/IsDisabled";
import IsDupplicated from "./functions/IsDupplicated";
import MakeAccountState from "./functions/makeAccountState";
import MakeCheckboxState from "./functions/makeCheckboxState";
import SortByLevel from "./functions/SortByLevel";
import { ModalState } from "../../../../atoms/modal";
import { AccountOrder } from "../../../../atoms/order";

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
export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-right: 50px;
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  h1 {
    color: ${(props) => props.theme.TextColor_A};
    font-size: 40px;
    font-weight: bolder;
  }
`;
const AddAccount = () => {
  const setModalState = useSetRecoilState(ModalState);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const setCheckBoxConfig = useSetRecoilState(CheckBoxConfig);
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
    const AccountState = MakeAccountState(Character);

    setAccountState((prev) => {
      const copiedPrev = {
        ...prev,
        [`${AccountOwner}`]: { ...AccountState },
      };
      return copiedPrev;
    });
    setCheckBoxConfig((prev) => {
      const copiedPrev = {
        ...prev,
        ...MakeCheckboxState(AccountState, Column),
      };
      return copiedPrev;
    });
    setAccountOrder((prev) => [
      ...prev,
      {
        AccountName: AccountOwner,
        CharacterOrder: Object.keys(AccountState).filter(
          (name) => AccountState[name].isVisible
        ),
      },
    ]);
    setModalState((prev) => ({ ...prev, isModalOpen: false }));
  };

  useEffect(() => {
    setIsDisabled(() => IsDisabled(isDupplicated, isNull, isInValid));
  }, [isDupplicated, isNull, isInValid]);

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
    </>
  );
};

export default AddAccount;

import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggined } from "./DragAccounts";
import { UserState } from "../atoms/fetchData";
import { ModalAddAcountAtom } from "../atoms/modal";

const Button = styled.button`
  height: 100px;
  border: none;
  background-color: ${(props) => props.theme.Color_4};
  color: ${(props) => props.theme.TextColor_A};
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
const ButtonAddAccount = () => {
  const userState = useRecoilValue(UserState);
  const openModal = useSetRecoilState(ModalAddAcountAtom);
  return (
    <Button
      onClick={() => {
        if (!isLoggined(userState)) return;
        openModal(true);
      }}
    >
      계정 추가하기
    </Button>
  );
};
export default ButtonAddAccount;

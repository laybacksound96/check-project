import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { dragIcon } from "../Settings";
import { IAccount } from "../atoms/data";
import { useRecoilValue } from "recoil";
import { LoginState } from "../atoms/login";

interface IStyle {
  isVisible: boolean;
  Color: string;
}
const CheckBox = styled.div<IStyle>`
  opacity: ${({ isVisible }) => (isVisible ? "100%" : "0%")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${dragIcon.icon.fontSize}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  svg {
    border-radius: 5px;

    path {
      color: ${(props) => props.Color};
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.258);
    transition: ease-in-out 0.1s;
  }
`;
interface ICheckboxProps {
  CharacterName: string;
  ContentName: string;
  Color: string;
  Account: IAccount;
  isVisible: boolean;
  onClickHandler: (CharacterName: string, ContentName: string, checkIndex: number) => void;
}

function ButtonCheckBox({ CharacterName, ContentName, Color, isVisible, Account: { checks }, onClickHandler }: ICheckboxProps) {
  const checkIndex = checks.findIndex(({ characterName, contentName }) => CharacterName === characterName && ContentName === contentName);
  const checked = checkIndex === -1 ? false : true;
  const loggined = useRecoilValue(LoginState);
  function onClick() {
    if (!isVisible || !loggined) return;
    onClickHandler(CharacterName, ContentName, checkIndex);
  }
  return (
    <CheckBox onClick={onClick} isVisible={isVisible} Color={Color}>
      <FontAwesomeIcon icon={checked ? faSquareCheck : faSquare} size="lg" />
    </CheckBox>
  );
}

export default ButtonCheckBox;

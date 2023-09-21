import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { dragIcon } from "../Settings";
import { AccountOrder, IAccountOrder, IContent } from "../atoms/data";

interface IStyle {
  isVisible: boolean;
  isActivated: boolean;
  Color: string;
}
const CheckBox = styled.div<IStyle>`
  opacity: ${({ isActivated, isVisible }) =>
    !isVisible || !isActivated ? "0%" : "100%"};
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
  AccountIndex: number;
  CharacterName: string;
  ContentName: string;
  Color: string;
  Account: IAccountOrder;
}

function CheckBoxButton({
  AccountIndex,
  CharacterName,
  ContentName,
  Color,
  Account: { checks, contents },
}: ICheckboxProps) {
  const checked = checks.find(
    ({ characterName, contentName }) =>
      CharacterName === characterName && ContentName === contentName
  );

  function onClickHandler() {}
  return (
    <CheckBox
      onClick={onClickHandler}
      isVisible={true}
      isActivated={true}
      Color={Color}
    >
      <FontAwesomeIcon icon={checked ? faSquareCheck : faSquare} size="lg" />
    </CheckBox>
  );
}

export default CheckBoxButton;

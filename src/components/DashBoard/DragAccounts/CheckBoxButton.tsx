import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";
import useCharsContentSetting from "../../../CustomHooks/UserSetting/useCharsContentSetting";

interface IStyle {
  isVisible: boolean;
  isActivated: boolean;
  Color: string;
}
const CheckBox = styled.div<IStyle>`
  opacity: ${(props) => (props.isVisible && props.isActivated ? "100%" : "0%")};
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
  AccountName: string;
  CharacterName: string;
  ContentName: string;
  Color: string;
}

function CheckBoxButton({
  AccountName,
  CharacterName,
  ContentName,
  Color,
}: ICheckboxProps) {
  const [{ isVisible, isActivated, isCleared }, setter] =
    useCharsContentSetting(AccountName, CharacterName, ContentName);
  function onClickHandler() {
    if (!isVisible || !isActivated) return;
    setter("isCleared", !isVisible);
  }
  return (
    <CheckBox
      onClick={onClickHandler}
      isVisible={isVisible}
      isActivated={isActivated}
      Color={Color}
    >
      <FontAwesomeIcon icon={isCleared ? faSquareCheck : faSquare} size="lg" />
    </CheckBox>
  );
}

export default CheckBoxButton;

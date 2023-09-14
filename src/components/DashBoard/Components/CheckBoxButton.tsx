import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../../atoms/login";
import { Accounts } from "../../../atoms/data";

interface IStyle {
  isVisible: boolean;
  Color: string;
}
const CheckBox = styled.div<IStyle>`
  opacity: ${({ isVisible }) => (!isVisible ? "0%" : "100%")};
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
  Color: string;
  isVisible: boolean;
  contentName: string;
  characterName: string;
  index: number;
}

function CheckBoxButton({
  isVisible,
  Color,
  characterName,
  contentName,
  index,
}: ICheckboxProps) {
  const [accountOrder, setAccount] = useRecoilState(Accounts);
  const loggined = useRecoilValue(LoginState);

  function isCleared() {
    const find = accountOrder[index].checks.find(
      ({ characterName: chara, contentName: cont }) =>
        chara === characterName && cont === contentName
    );
    if (find) {
      return true;
    } else {
      return false;
    }
  }
  function onClickHandler() {
    if (!isVisible || !loggined) return;
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const copiedAccout = { ...copiedPrev[index] };
      const copiedChecks = [...copiedAccout.checks];
      const boxIndex = copiedChecks.findIndex(
        ({ characterName: chara, contentName: cont }) =>
          chara === characterName && cont === contentName
      );
      if (boxIndex >= 0) {
        copiedChecks.splice(boxIndex, 1);
      } else {
        copiedChecks.push({ characterName, contentName });
      }
      copiedAccout.checks = copiedChecks;
      copiedPrev[index] = copiedAccout;
      return copiedPrev;
    });
  }
  return (
    <CheckBox onClick={onClickHandler} isVisible={isVisible} Color={Color}>
      <FontAwesomeIcon
        icon={isCleared() ? faSquareCheck : faSquare}
        size="lg"
      />
    </CheckBox>
  );
}

export default CheckBoxButton;

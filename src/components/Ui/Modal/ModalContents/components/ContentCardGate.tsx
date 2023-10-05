import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCardCheckBox from "./ContentCardCheckBox";
import { AccountOrder, IGate } from "../../../../../atoms/data";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { patchContent } from "../../../../../util/fetch";

const GateVisibleContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 30px;
    opacity: 20%;
    transition: opacity 0.1s ease-in-out;
    &:hover {
      opacity: 100%;
    }
  }
`;
interface IconContainerStyle {
  Color: string | undefined;
  isContentVisible: boolean;
  isGateVisible: boolean;
}
const GateContainer = styled.div<IconContainerStyle>`
  display: flex;
  box-shadow: ${({ isGateVisible, isContentVisible }) =>
    isGateVisible === false || isContentVisible === false
      ? "none"
      : "0px 3px 5px 0px rgba(0, 0, 0, 0.35)"};
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({
    Color,
    isGateVisible,
    isContentVisible,
    theme: { TextColor_B },
  }) =>
    Color === undefined || isGateVisible === false || isContentVisible === false
      ? TextColor_B
      : Color};
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 7px;
  opacity: ${(props) => (props.isGateVisible ? "100%" : "30%")};
  transition: all 0.2s ease-in-out;
`;

const GateNumber = styled.span`
  font-size: 40px;
  text-align: center;
`;
const DifficultyContainer = styled.div`
  padding: 5px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  width: 100%;
`;

interface IProps {
  Difficulty: string;
  Gate: IGate;
  GateIndex: number;
  isGateVisible: boolean;
  isVisible: boolean;
  Color: string;
  isConvertable: boolean;
  accountIndex: number;
  contentName: string;
  characterName: string;
  isGateActivate: boolean;
}
const ContentCardGate = ({
  Difficulty,
  Gate,
  GateIndex,
  isVisible,
  isGateVisible,
  Color,
  isConvertable,
  accountIndex,
  contentName,
  characterName,
  isGateActivate,
}: IProps) => {
  const setAccount = useSetRecoilState(AccountOrder);
  const hanldeGateVisible = () => {
    if (!isGateActivate) return;
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const copiedAccount = { ...copiedPrev[accountIndex] };
      const copiedContents = [...copiedAccount.contents];
      const contentIndex = copiedContents.findIndex(
        ({ contentName: name, owner }) =>
          name === contentName && characterName === owner
      );
      if (contentIndex === -1) return copiedPrev;
      const copiedContent = { ...copiedContents[contentIndex] };
      const copiedGates = [...copiedContent.gateSetting];
      const copiedGate = { ...copiedGates[GateIndex] };
      copiedGate.isVisible = !copiedGate.isVisible;
      copiedGates[GateIndex] = copiedGate;
      copiedContent.gateSetting = copiedGates;
      copiedContents[contentIndex] = copiedContent;
      copiedAccount.contents = copiedContents;
      copiedPrev[accountIndex] = copiedAccount;
      // patchContent(copiedAccount._id, userId, copiedContent, contentIndex);
      return copiedPrev;
    });
  };
  const hanldeGateDifficulty = (diff: string) => {
    if (!isConvertable || Difficulty === diff) return;
    setAccount((prev) => {
      const copiedPrev = [...prev];
      const copiedAccount = { ...copiedPrev[accountIndex] };
      const copiedContents = [...copiedAccount.contents];
      const contentIndex = copiedContents.findIndex(
        ({ contentName: name, owner }) =>
          name === contentName && characterName === owner
      );
      if (contentIndex === -1) return copiedPrev;
      const copiedContent = { ...copiedContents[contentIndex] };
      const copiedGates = [...copiedContent.gateSetting];
      const copiedGate = { ...copiedGates[GateIndex] };
      copiedGate.difficulty = diff;
      copiedGates[GateIndex] = copiedGate;
      copiedContent.gateSetting = copiedGates;
      copiedContents[contentIndex] = copiedContent;
      copiedAccount.contents = copiedContents;
      copiedPrev[accountIndex] = copiedAccount;
      // patchContent(copiedAccount._id, userId, copiedContent, contentIndex);
      return copiedPrev;
    });
  };
  return (
    <GateContainer
      Color={Color}
      isContentVisible={isVisible}
      isGateVisible={isGateVisible}
    >
      <GateNumber>{GateIndex + 1}</GateNumber>
      <DifficultyContainer>
        <CheckBoxContainer>
          <ContentCardCheckBox
            isCovertable={isConvertable}
            State={Difficulty}
            Difficulty="normal"
            handler={() => hanldeGateDifficulty("normal")}
          />
          <ContentCardCheckBox
            isCovertable={isConvertable}
            State={Difficulty}
            Difficulty="hard"
            handler={() => hanldeGateDifficulty("hard")}
          />
        </CheckBoxContainer>
      </DifficultyContainer>
      <GateVisibleContainer>
        <FontAwesomeIcon
          icon={isGateVisible ? faEye : faEyeSlash}
          onClick={() => hanldeGateVisible()}
        />
      </GateVisibleContainer>
    </GateContainer>
  );
};

export default ContentCardGate;

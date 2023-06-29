import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Character,
  NameContainer,
  ButtonContainer,
} from "./SettingVisibleContent";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { CharacterInfo } from "../../../../../atoms/Info/CharacterInfo";
import { ContentSetting } from "../../../../../atoms/Settings/ContentSetting";

interface IProps {
  AccountName: string;
  ContentName: string;
}
const SettingContents = ({ AccountName, ContentName }: IProps) => {
  const [
    {
      [AccountName]: {
        [CharacterName]: { isVisible: isVisibleChar },
      },
    },
    setCharacterSetting,
  ] = useRecoilState(ContentSetting);
  const {
    [AccountName]: {
      [CharacterName]: { ClassName, Level },
    },
  } = useRecoilValue(CharacterInfo);
  const handleVisible = () => {
    setCharacterSetting((prev) => {
      return {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            isVisible: !isVisibleChar,
          },
        },
      };
    });
  };
  return (
    <Character key={ContentName} isVisible={isVisible}>
      <NameContainer>{ContentName}</NameContainer>
      <ButtonContainer>
        <FontAwesomeIcon
          onClick={() => setter("isVisible")}
          icon={isVisible ? faEye : faEyeSlash}
        />
      </ButtonContainer>
    </Character>
  );
};

export default SettingContents;

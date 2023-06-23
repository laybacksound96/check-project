import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Character,
  NameContainer,
  ButtonContainer,
} from "./SettingVisibleContent";
import useContentsSetting from "../../../../../CustomHooks/UserSetting/useContentsSetting";

interface IProps {
  AccountName: string;
  ContentName: string;
}
const SettingContents = ({ AccountName, ContentName }: IProps) => {
  const [{ isVisible }, setter] = useContentsSetting(AccountName, ContentName);
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

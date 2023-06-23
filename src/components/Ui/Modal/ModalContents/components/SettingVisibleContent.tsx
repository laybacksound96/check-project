import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCharacterSettings from "../../../../../CustomHooks/UserSetting/useCharacterSettings";
export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
    &:nth-child(2) {
      font-size: 0.85rem;
    }
  }
`;
interface IStyel {
  isVisible: boolean;
}
export const Character = styled.div<IStyel>`
  opacity: ${(props) => (props.isVisible ? "100%" : "20%")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  font-size: 17px;
  height: 70px;
  border-radius: 5px;
  background-color: rgba(100, 100, 100, 0.1);
  margin-bottom: 10px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 70%;
    }
  }

  svg {
    opacity: 20%;
    border-radius: 10px;
    font-size: 30px;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-right: 10px;
`;
interface IProps {
  AccountName: string;
  CharacterName: string;
}
const SettingCharacters = ({ AccountName, CharacterName }: IProps) => {
  const [{ CharacterClassName, ItemMaxLevel, isVisible }, setter] =
    useCharacterSettings(AccountName, CharacterName);
  return (
    <Character key={CharacterName} isVisible={isVisible}>
      <NameContainer>
        {CharacterName}
        <span>{CharacterClassName}</span>
        <span>Lv {ItemMaxLevel}</span>
      </NameContainer>
      <ButtonContainer>
        <FontAwesomeIcon
          onClick={() => setter("isVisible")}
          icon={isVisible ? faEye : faEyeSlash}
        />
      </ButtonContainer>
    </Character>
  );
};

export default SettingCharacters;

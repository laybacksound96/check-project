import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { AccountOrder, ICharacter } from "../../../../../atoms/data";
import { patchCharacter } from "../../../../../util/fetch";
import { UserState } from "../../../../../atoms/fetchData";

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.1rem;
    margin-bottom: 3px;
    svg {
      font-size: 0.9rem;
      margin: 0px 5px;
      margin-bottom: 2px;
    }
  }
  span {
    color: white;
    font-size: 0.8rem;
    color: ${(props) => props.theme.TextColor_A};
    opacity: 40%;
    svg {
      margin-right: 3px;
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
  width: auto;
  padding: 7px;
  font-size: 17px;
  height: auto;
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
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-right: 10px;
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
interface IProps {
  index: number;
  Character: ICharacter;
  isVisible: boolean;
  charIndex: number;
}
const SettingCharacters = ({
  index,
  Character: {
    CharacterName,
    ItemMaxLevel,
    isGoldCharacter,
    CharacterClassName,
  },
  isVisible,
  charIndex,
}: IProps) => {
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const userState = useRecoilValue(UserState);
  const handleGoldChar = () => {
    setAccountOrder((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[index] };
      const copiedcharacters = [...copiedData.characters];
      const cpopiedCharacter = { ...copiedcharacters[charIndex] };
      cpopiedCharacter.isGoldCharacter = !cpopiedCharacter.isGoldCharacter;
      copiedcharacters[charIndex] = cpopiedCharacter;
      copiedData.characters = copiedcharacters;
      copiedAccounts[index] = copiedData;

      return copiedAccounts;
    });
  };
  const handleVisible = () => {
    setAccountOrder((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[index] };
      const copiedCharacterOrder = [...copiedData.characterOrder];
      const target = CharacterName;
      const targetIndex = copiedCharacterOrder.findIndex(
        (name) => name === target
      );
      if (isVisible) {
        if (targetIndex === -1) {
          return copiedAccounts;
        }
        copiedCharacterOrder.splice(targetIndex, 1);
      } else {
        copiedCharacterOrder.push(target);
      }
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        patchCharacter(copiedData._id, userId, copiedCharacterOrder);
      }
      copiedData.characterOrder = copiedCharacterOrder;
      copiedAccounts[index] = copiedData;
      return copiedAccounts;
    });
  };

  return (
    <Character key={CharacterName} isVisible={isVisible}>
      <NameContainer>
        <h1>{CharacterName}</h1>
        {isGoldCharacter && (
          <span>
            <FontAwesomeIcon icon={faCoins} color="yellow" />
            골드획득캐릭터
          </span>
        )}
        <span>{CharacterClassName}</span>
        <span>Lv {ItemMaxLevel}</span>
      </NameContainer>
      <ButtonContainer>
        <FontAwesomeIcon
          icon={faCoins}
          color={isGoldCharacter ? "yellow" : "white"}
          onClick={() => handleGoldChar()}
        />
        <FontAwesomeIcon
          onClick={() => handleVisible()}
          icon={isVisible ? faEye : faEyeSlash}
        />
      </ButtonContainer>
    </Character>
  );
};

export default SettingCharacters;

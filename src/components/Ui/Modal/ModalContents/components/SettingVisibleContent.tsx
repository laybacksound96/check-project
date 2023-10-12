import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Accounts, Characters, ICharacter } from "../../../../../atoms/data";
import { changeCharacterVisible } from "../../../../Functions/changeFunctions";
import { useParams } from "react-router-dom";
import { patchOrder } from "../../../../../fetch/account";
import { patchGoldContents } from "../../../../../fetch/character";

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
  account_id: string;
  index: number;
  Character: ICharacter;
  isVisible: boolean;
  charIndex: number;
}
const SettingCharacters = ({
  account_id,
  Character: { CharacterName, ItemMaxLevel, isGoldCharacter, CharacterClassName },
  isVisible,
  charIndex,
}: IProps) => {
  const { userId } = useParams();
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const [characters, setCharacters] = useRecoilState(Characters);
  const handleGoldChar = async () => {
    if (!userId) return;
    const index = characters.findIndex(({ owner }) => owner === account_id);
    if (index === -1) return;
    const chracter = characters[index].characters[charIndex];
    const fetchedData = await patchGoldContents(userId, characters[index]._id, chracter.CharacterName, chracter.isGoldCharacter);
    setCharacters((prev) => {
      const CopiedPrev = [...prev];
      CopiedPrev[index] = fetchedData;
      return CopiedPrev;
    });
  };
  const handleVisible = async () => {
    if (!userId) return;
    const account = accounts.find(({ _id }) => _id === account_id);
    const accountIndex = accounts.findIndex(({ _id }) => _id === account_id);
    if (!account || accountIndex === -1) return;
    const newOrder = changeCharacterVisible(account.characterOrder, CharacterName);
    const newAccount = await patchOrder(userId, account._id, {
      name: "characterOrder",
      order: newOrder,
    });
    if (!newAccount) return;
    setAccounts((prev) => {
      const copiedAccounts = [...prev];
      copiedAccounts[accountIndex] = newAccount;
      return copiedAccounts;
    });
    return;
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
        <FontAwesomeIcon icon={faCoins} color={isGoldCharacter ? "yellow" : "white"} onClick={() => handleGoldChar()} />
        <FontAwesomeIcon onClick={() => handleVisible()} icon={isVisible ? faEye : faEyeSlash} />
      </ButtonContainer>
    </Character>
  );
};

export default SettingCharacters;

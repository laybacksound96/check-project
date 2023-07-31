import useModal from "../../../CustomHooks/Modal/useModal";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../../atoms/login";
import { Accounts, Characters } from "../../../atoms/data";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;

  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 7px 7px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const ConfigContentButton = ({
  AccountName,
  CharacterName,
}: {
  AccountName: string;
  CharacterName: string;
}) => {
  const [ConfigAccount] = useModal();
  const loggined = useRecoilValue(LoginState);
  const [characters, setCharacters] = useRecoilState(Characters);
  const [accounts, setAccounts] = useRecoilState(Accounts);
  const turnOffVisible = () => {
    setCharacters((prev) => {
      const copiedPrev = [...prev];
      const Index = copiedPrev.findIndex(
        (chara) => chara.characterName === CharacterName
      );
      copiedPrev[Index] = {
        ...copiedPrev[Index],
        isVisible: false,
        isGoldCharacter: false,
      };
      if (Index === -1) return prev;
      return copiedPrev;
    });
    setAccounts((prev) => {
      const copiedPrev = [...prev];
      const Index = copiedPrev.findIndex(
        (chara) => chara.accountName === AccountName
      );
      if (Index === -1) return prev;
      const copiedAccount = { ...copiedPrev[Index] };
      const copiedCharacterOrder = [...copiedAccount.characterOrder];
      const charaIndex = copiedCharacterOrder.indexOf(CharacterName);
      if (charaIndex === -1) return prev;
      copiedCharacterOrder.splice(charaIndex, 1);
      copiedAccount.characterOrder = copiedCharacterOrder;
      copiedPrev[Index] = copiedAccount;
      return copiedPrev;
    });
  };
  return (
    <>
      {loggined && (
        <ButtonContainer>
          <FontAwesomeIcon onClick={() => turnOffVisible()} icon={faEye} />
          <FontAwesomeIcon
            onClick={() => {
              if (!loggined) return;
              ConfigAccount("CONFIG_CONTENT", {
                AccountName,
                CharacterName,
              });
            }}
            icon={faGear}
            size="lg"
          />
        </ButtonContainer>
      )}
    </>
  );
};
export default ConfigContentButton;

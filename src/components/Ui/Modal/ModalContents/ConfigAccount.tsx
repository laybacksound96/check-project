import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DangerZone from "./components/DangerZone";
import useModal from "../../../../CustomHooks/Modal/useModal";
import SettingCharacters from "./components/SettingVisibleContent";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CharacterSetting } from "../../../../atoms/Settings/CharacterSetting";
import { CharacterInfo } from "../../../../atoms/Info/CharacterInfo";
import { ContentSetting } from "../../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../../atoms/Settings/Gates";
import {
  CharacterOrder,
  ContentsOrder,
  AccountOrder,
} from "../../../../atoms/Settings/Orders";

const ModalContainer = styled.div`
  width: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.Color_4};
  padding: 15px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  transition: opacity 0.3s ease-in-out;
  header {
    font-size: 20px;
    margin: 5px 0 10px 0;
    svg {
      margin-right: 5px;
    }
  }
`;
const CharacterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  gap: 10px;
`;
export const ConfigAccount = () => {
  const [
    ,
    closeModal,
    {
      modalProp: { AccountName },
    },
  ] = useModal();
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const setCharacterOrder = useSetRecoilState(CharacterOrder);
  const setContentsOrder = useSetRecoilState(ContentsOrder);
  const setCharacterInfo = useSetRecoilState(CharacterInfo);
  const setCharacterSetting = useSetRecoilState(CharacterSetting);
  const setContentSetting = useSetRecoilState(ContentSetting);
  const setGates = useSetRecoilState(Gates);
  const { [AccountName]: Characters } = useRecoilValue(CharacterSetting);

  function handleDelete() {
    setCharacterInfo((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    setCharacterSetting((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    setContentSetting((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    setGates((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    setAccountOrder((prev) => {
      const copiedPrev = [...prev];
      const index = copiedPrev.indexOf(AccountName);
      copiedPrev.splice(index, 1);
      return copiedPrev;
    });
    setCharacterOrder((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    setContentsOrder((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[AccountName];
      return copiedPrev;
    });
    closeModal();
  }
  return (
    <>
      <ModalContainer>
        <ContentList>
          <header>
            <FontAwesomeIcon icon={faGear} />
            <span>캐릭터 표시 설정</span>
          </header>
          <CharacterContainer>
            {Object.keys(Characters).map((characterName) => {
              return (
                <SettingCharacters
                  key={characterName}
                  AccountName={AccountName}
                  CharacterName={characterName}
                />
              );
            })}
          </CharacterContainer>
        </ContentList>
      </ModalContainer>
      <DangerZone handleDelete={handleDelete} />
    </>
  );
};

export default ConfigAccount;

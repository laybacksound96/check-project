import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DangerZone from "./Ui/Modal/ModalContents/components/DangerZone";
import SettingCharacters from "./Ui/Modal/ModalContents/components/SettingVisibleContent";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
export const ModalConfigAccount = () => {
  function handleDelete() {}
  return (
    <>
      {/* <ModalContainer>
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
      <DangerZone handleDelete={handleDelete} /> */}
    </>
  );
};

export default ModalConfigAccount;

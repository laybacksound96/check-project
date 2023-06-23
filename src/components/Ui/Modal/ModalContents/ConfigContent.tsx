import { UserSetting } from "../../../../atoms/atoms";
import { GridContainer } from "./ConfigAccount";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DangerZone from "./components/DangerZone";
import useModal from "../../../../CustomHooks/Modal/useModal";
import SettingCharacters from "./components/SettingVisibleContent";
import { useRecoilValue } from "recoil";
import SettingContents from "./components/SettingContents";

const Container = styled.div`
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
export const ConfigContent = () => {
  const [, , { AccountName }] = useModal();
  const {
    [`${AccountName}`]: { ContentsSetting, CharacterSetting },
  } = useRecoilValue(UserSetting);
  function handleDelete() {}
  return (
    <>
      <Container>
        <GridContainer>
          <ContentList>
            <header>
              <FontAwesomeIcon icon={faGear} />
              <span>캐릭터 표시 설정</span>
            </header>
            {Object.keys(CharacterSetting).map((characterName) => {
              return (
                <SettingCharacters
                  AccountName={AccountName}
                  CharacterName={characterName}
                />
              );
            })}
          </ContentList>
          <ContentList>
            <header>
              <FontAwesomeIcon icon={faGear} />
              <span>컨텐츠 표시 설정</span>
            </header>
            {Object.keys(ContentsSetting).map((ContentName) => {
              return (
                <SettingContents
                  AccountName={AccountName}
                  ContentName={ContentName}
                />
              );
            })}
          </ContentList>
        </GridContainer>
      </Container>
      <DangerZone handleDelete={handleDelete} />
    </>
  );
};

export default ConfigContent;

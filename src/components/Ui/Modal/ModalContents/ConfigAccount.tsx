import { UserSetting } from "../../../../atoms/Settings/ContentSetting";
import { GridContainer } from "./ConfigContent";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DangerZone from "./components/DangerZone";
import useModal from "../../../../CustomHooks/Modal/useModal";
import SettingCharacters from "./components/SettingVisibleContent";
import { useRecoilState, useSetRecoilState } from "recoil";
import SettingContents from "./components/SettingContents";
import { AccountOrder } from "../../../../atoms/OrdersSettings";

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
export const ConfigAccount = () => {
  const [
    ,
    closeModal,
    {
      modalProp: { AccountName },
    },
  ] = useModal();
  const [
    {
      [`${AccountName}`]: { ContentsSetting, CharacterSetting },
    },
    setUserSetting,
  ] = useRecoilState(UserSetting);
  const setAccountOrder = useSetRecoilState(AccountOrder);
  function handleDelete() {
    // setAccountOrder((prev) => {
    //   const newArray = prev.filter((elem) => elem.AccountName !== AccountName);
    //   return newArray;
    // });
    setUserSetting((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[`${AccountName}`];
      return copiedPrev;
    });
    closeModal();
  }
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
                  key={characterName}
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
                  key={ContentName}
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

export default ConfigAccount;

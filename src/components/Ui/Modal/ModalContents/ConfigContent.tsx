import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalState } from "../../../../atoms/modal";
import {
  AccountState,
  CheckBoxConfig,
  ContentsState,
} from "../../../../atoms/atoms";
import { GridContainer } from "./ConfigAccount";
import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import DangerZone from "./components/DangerZone";
import useModal from "../../../../CustomHooks/Modal/useModal";

interface IStyel {
  isVisible: boolean;
}
const Container = styled.div`
  width: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
`;

const Character = styled.div<IStyel>`
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  margin-right: 10px;
`;
const NameContainer = styled.div`
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
  const [, closeModal] = useModal("CONFIG_CONTENT");
  const {
    modalProp: { AccountName },
  } = useRecoilValue(ModalState);
  const [accountState, setAccountState] = useRecoilState(AccountState);
  const [contentsState, setContentsState] = useRecoilState(ContentsState);
  const setCheckboxConfig = useSetRecoilState(CheckBoxConfig);
  const handleAccountVisible = (CharacterName: string) => {
    setAccountState((prev) => {
      const currentVisible = prev[AccountName][CharacterName].isVisible;
      const copiedPrev = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            isVisible: !currentVisible,
          },
        },
      };

      return copiedPrev;
    });
  };
  const handleContentVisible = (CharacterName: string) => {
    setContentsState((prev) => {
      const currentVisible = prev[AccountName][CharacterName].isVisible;
      const copiedPrev = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            isVisible: !currentVisible,
          },
        },
      };
      return copiedPrev;
    });
  };
  const handleDelete = () => {
    setCheckboxConfig((prev) => {
      const copiedPrev = { ...prev };
      for (let name in accountState[AccountName]) {
        delete copiedPrev[`${name}`];
      }
      return copiedPrev;
    });
    setAccountState((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[`${AccountName}`];
      return copiedPrev;
    });
    setContentsState((prev) => {
      const copiedPrev = { ...prev };
      delete copiedPrev[`${AccountName}`];
      return copiedPrev;
    });
    closeModal();
  };
  return (
    <>
      <Container>
        <GridContainer>
          <ContentList>
            <header>
              <FontAwesomeIcon icon={faGear} />
              <span>캐릭터 표시 설정</span>
            </header>
            {Object.keys(accountState[AccountName]).map((character) => {
              const { CharacterClassName, ItemMaxLevel, isVisible } =
                accountState[AccountName][character];
              return (
                <Character key={character} isVisible={isVisible}>
                  <NameContainer>
                    {character}
                    <span>{CharacterClassName}</span>
                    <span>Lv {ItemMaxLevel}</span>
                  </NameContainer>
                  <ButtonContainer>
                    <FontAwesomeIcon
                      onClick={() => handleAccountVisible(character)}
                      icon={isVisible ? faEye : faEyeSlash}
                    />
                  </ButtonContainer>
                </Character>
              );
            })}
          </ContentList>
          <ContentList>
            <header>
              <FontAwesomeIcon icon={faGear} />
              <span>컨텐츠 표시 설정</span>
            </header>
            {Object.keys(contentsState[AccountName]).map((contentName) => {
              const { isVisible } = contentsState[AccountName][contentName];
              return (
                <Character key={contentName} isVisible={isVisible}>
                  <NameContainer>{contentName}</NameContainer>
                  <ButtonContainer>
                    <FontAwesomeIcon
                      onClick={() => handleContentVisible(contentName)}
                      icon={isVisible ? faEye : faEyeSlash}
                    />
                  </ButtonContainer>
                </Character>
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

import { useRecoilState, useRecoilValue } from "recoil";
import { ModalState } from "../../../../atoms/modal";
import { AccountState } from "../../../../atoms/atoms";
import { Container, GridContainer } from "./ConfigAccount";
import styled from "styled-components";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGear } from "@fortawesome/free-solid-svg-icons";
interface IStyel {
  isVisible: boolean;
}
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
  const {
    modalProp: { AccountName },
  } = useRecoilValue(ModalState);
  const [accountState, setAccountState] = useRecoilState(AccountState);

  const handleVisible = (CharacterName: string) => {
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
  return (
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
                    onClick={() => handleVisible(character)}
                    icon={isVisible ? faEye : faEyeSlash}
                  />
                </ButtonContainer>
              </Character>
            );
          })}
        </ContentList>
      </GridContainer>
    </Container>
  );
};

export default ConfigContent;

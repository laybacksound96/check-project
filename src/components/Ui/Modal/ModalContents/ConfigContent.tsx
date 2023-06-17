import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountState,
  ContentsState,
  IContents,
} from "../../../../atoms/atoms";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  overflow-y: auto;
  height: 80vh;
`;
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  span {
    font-size: 30px;
  }
`;
const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
interface IStyle {
  isVisible: boolean;
}
const NameBox = styled.div<IStyle>`
  display: flex;
  height: 30px;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  opacity: ${(props) => (props.isVisible ? "100%" : "30%")};
  background-color: ${(props) => props.theme.Color_4};
  justify-content: center;
  align-items: center;
`;

const ContentCard = styled.div<IStyle>`
  background-color: ${(props) => props.theme.TextColor_A};
  opacity: ${(props) => (props.isVisible ? "100%" : "30%")};
  border-radius: 20px;
  padding: 20px;
  margin-left: 20px;
  margin: 5px 0;
  width: auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  p {
    color: ${(props) => props.theme.Color_4};
  }
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-right: 50px;
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  h1 {
    color: ${(props) => props.theme.TextColor_A};
    font-size: 40px;
    font-weight: bolder;
  }
`;
const ConfigContent = () => {
  const [content, setContent] = useRecoilState(ContentsState);
  const accountState = useRecoilValue(AccountState);
  const DefaultContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Default"
  );

  const CustomContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Custom"
  );

  const visibleHandlerContents = (contentName: string): void => {
    setContent((prev) => {
      const currentVisible = prev[contentName].isVisible;
      const copiedPrev: IContents = {
        ...prev,
        [`${contentName}`]: {
          ...prev[`${contentName}`],
          isVisible: !currentVisible,
        },
      };
      return copiedPrev;
    });
  };
  const visibleHandler = (Name: string) => {
    console.log(Name);
  };
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>Settings</h1>
      </Header>
      <hr></hr>
      <SwitchContainer>
        <ContentsContainer>
          <span>Account</span>
          <NameContainer>
            {Object.keys(accountState).map((CharacterName) => {
              const { isVisible } = accountState[CharacterName];
              return (
                <NameBox
                  isVisible={isVisible}
                  key={CharacterName}
                  onClick={() => visibleHandler(CharacterName)}
                >
                  <p>{CharacterName}</p>
                </NameBox>
              );
            })}
          </NameContainer>
        </ContentsContainer>

        <ContentsContainer>
          <span>Basic</span>
          {DefaultContents.map((contentName) => {
            const { isVisible } = content[contentName];
            return (
              <ContentCard
                isVisible={isVisible}
                key={contentName}
                onClick={() => visibleHandlerContents(contentName)}
              >
                <p>{contentName}</p>
              </ContentCard>
            );
          })}
        </ContentsContainer>

        <ContentsContainer>
          <span>Custom</span>
          {CustomContents.map((contentName) => {
            const { isVisible } = content[contentName];
            return (
              <ContentCard
                isVisible={isVisible}
                key={contentName}
                onClick={() => visibleHandlerContents(contentName)}
              >
                <p> {contentName}</p>
                <p>x</p>
              </ContentCard>
            );
          })}
        </ContentsContainer>
      </SwitchContainer>
    </Container>
  );
};

export default ConfigContent;

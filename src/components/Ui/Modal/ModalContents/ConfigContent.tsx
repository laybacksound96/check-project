import { useRecoilState } from "recoil";
import { ContentsState } from "../../../../atoms";

import Switch from "../../UiComponents/Switch";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  span {
    font-size: 30px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ContentCard = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 20px;
  padding: 20px;
  margin-left: 20px;
  margin: 5px 0;
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
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
    font-size: 40px;
    font-weight: bolder;
  }
`;
const ConfigContent = () => {
  const [content, setContent] = useRecoilState(ContentsState);
  const DefaultContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Default"
  );

  const CustomContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Custom"
  );

  function getValueHandler(isOn: boolean, contentName: string): void {
    setContent((prev) => {
      const copiedPrev = { ...prev };
      const CopiedTargetPrev = { ...copiedPrev[contentName] };
      CopiedTargetPrev.isVisible = isOn;
      copiedPrev[contentName] = CopiedTargetPrev;
      return copiedPrev;
    });
  }

  return (
    <div>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>Settings</h1>
      </Header>
      <hr></hr>
      <Container>
        <ContentsContainer>
          <span>Basic</span>
          {DefaultContents.map((contentName) => (
            <ContentCard key={contentName}>
              {contentName}
              <Switch
                switchKey={contentName}
                switchState={content[contentName].isVisible}
                getValue={getValueHandler}
              />
            </ContentCard>
          ))}
        </ContentsContainer>

        <ContentsContainer>
          <span>Custom</span>
          {CustomContents.map((contentName) => (
            <ContentCard key={contentName}>
              {contentName}
              <Switch
                switchKey={contentName}
                switchState={content[contentName].isVisible}
                getValue={getValueHandler}
              />
            </ContentCard>
          ))}
        </ContentsContainer>
      </Container>
    </div>
  );
};

export default ConfigContent;

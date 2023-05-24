import { useRecoilValue } from "recoil";
import { ColumnState2 } from "../../../atoms";

import Switch from "../UiComponents/Switch";

import styled from "styled-components";
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
export const AddContent = () => {
  const columns = useRecoilValue(ColumnState2);

  const DefaultContents = columns.filter((elem) => elem.type === "Default");
  const CustomContents = columns.filter((elem) => elem.type === "Custom");
  return (
    <div>
      <h1 style={{ fontSize: "40px" }}>Settings</h1>
      <hr></hr>
      <Container>
        <ContentsContainer>
          <span>Basic</span>
          {DefaultContents.map((content) => (
            <ContentCard key={content.contentName}>
              {content.contentName} <Switch />
            </ContentCard>
          ))}
        </ContentsContainer>

        <ContentsContainer>
          <span>Custom</span>
          {CustomContents.map((content) => (
            <ContentCard key={content.contentName}>
              {content.contentName} <Switch />
            </ContentCard>
          ))}
        </ContentsContainer>
      </Container>
    </div>
  );
};

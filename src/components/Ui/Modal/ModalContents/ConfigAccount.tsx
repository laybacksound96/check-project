import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";
import { ModalState } from "../../../../atoms/modal";
import { UserSetting } from "../../../../atoms/atoms";

export const Container = styled.div`
  width: auto;
  height: 80vh;
  display: flex;
  position: block;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
`;
export const GridContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
`;

const ConfigCharContent = () => {
  const {
    modalProp: { CharacterName, AccountName },
  } = useRecoilValue(ModalState);
  const {
    [`${AccountName}`]: { ContentsSetting },
  } = useRecoilValue(UserSetting);
  return (
    <Container>
      <GridContainer>
        {Object.keys(ContentsSetting).map((ContentName) => {
          return (
            <ContentCard
              key={ContentName}
              AccountName={AccountName}
              CharacterName={CharacterName}
              ContentsName={ContentName}
            />
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default ConfigCharContent;

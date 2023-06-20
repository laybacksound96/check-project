import { useRecoilValue } from "recoil";
import { CheckBoxConfig } from "../../../../atoms/atoms";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";
import { ModalState } from "../../../../atoms/modal";

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

const ConfigAccount = () => {
  const {
    modalProp: { CharacterName },
  } = useRecoilValue(ModalState);

  const { [`${CharacterName}`]: contentsState } =
    useRecoilValue(CheckBoxConfig);

  return (
    <Container>
      <GridContainer>
        {Object.keys(contentsState).map((ContentName) => {
          const { Gates, isActivated } = contentsState[ContentName];
          return (
            isActivated && (
              <ContentCard
                key={ContentName}
                Gates={Gates}
                ContentsName={ContentName}
                ChracterName={CharacterName}
              />
            )
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default ConfigAccount;

import { useRecoilValue } from "recoil";
import { ModalState } from "../../../../atoms/modal";
import { AccountState } from "../../../../atoms/atoms";
import { Container, GridContainer } from "./ConfigAccount";
import { CardHeader } from "./components/ContentCard";
import { useState } from "react";
import styled from "styled-components";
interface IStyel {}
const NameCard = styled.div`
  width: 200px;
  height: 60px;
  background-color: ${(props) => props.theme.Color_1};
  border-radius: 5px;
  margin: 10px 0;
  font-size: 20px;
`;
const ContentList = styled.div<IStyel>`
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
`;
export const ConfigContent = () => {
  const {
    modalProp: { AccountName },
  } = useRecoilValue(ModalState);
  const characterState = useRecoilValue(AccountState)[AccountName];
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container>
      <GridContainer>
        <ContentList
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader>
            <h1>asdsad</h1>
          </CardHeader>
          <div>
            {Object.keys(characterState).map((character) => (
              <NameCard>{character}</NameCard>
            ))}
          </div>
        </ContentList>
      </GridContainer>
    </Container>
  );
};

export default ConfigContent;

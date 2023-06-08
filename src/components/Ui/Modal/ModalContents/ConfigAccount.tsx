import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { useRecoilValue } from "recoil";
import { CheckBoxConfig, ModalState } from "../../../../atoms";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";
import { useState } from "react";

const Container = styled.div`
  width: auto;
  height: 80vh;
  display: flex;
  position: block;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
`;
const GridContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
`;

const ConfigAccount = () => {
  const { modalProp: ChracterName } = useRecoilValue(ModalState);
  const { [`${ChracterName}`]: contentsState } = useRecoilValue(CheckBoxConfig);
  const ContentNames = Object.keys(contentsState);
  const [GoldContentsArray, setGoldContentsArray] = useState<string[]>([]);
  const modifyGoldContentsArray = (ContentsName: string) => {
    setGoldContentsArray((prev) => {
      if (GoldContentsArray.includes(ContentsName)) {
        const copiedPrev = [...prev];
        const index = GoldContentsArray.indexOf(ContentsName);
        copiedPrev.splice(index, 1);
        return copiedPrev;
      }
      return [...prev, ContentsName];
    });
    console.log(ContentsName);
  };
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>{ChracterName && `${ChracterName}`}'s Settings</h1>
      </Header>
      {GoldContentsArray.map((goldContents) => (
        <span>{goldContents}</span>
      ))}
      <GridContainer>
        {ContentNames.map((ContentName) => {
          const { Gates } = contentsState[ContentName];
          return (
            Gates && (
              <ContentCard
                key={ContentName}
                Gates={Gates}
                ContentsName={ContentName}
                ChracterName={ChracterName}
                modifyGoldContentsArray={modifyGoldContentsArray}
              />
            )
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default ConfigAccount;

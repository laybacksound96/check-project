import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ContentCard from "./Ui/Modal/ModalContents/components/ContentCard";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  width: auto;
  height: 80vh;
  display: flex;
  position: block;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
  p {
    margin-bottom: 5px;
  }
`;
export const GridContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
`;
const GoldContent = styled.div`
  display: flex;
  padding: 5px;
  margin: 2px;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 30px;
  background-color: #777717;
  border-radius: 5px;
`;
const GoldBox = styled.div`
  font-size: 2rem;
  span {
    margin-left: 5px;
  }
`;

const ConfigContent = () => {
  return (
    <div></div>
    // <Container>
    //   <p>골드획득 컨텐츠:</p>
    //   <div style={{ display: "flex" }}>
    //     {GoldContents.map((content) => {
    //       return <GoldContent key={content}>{content}</GoldContent>;
    //     })}
    //   </div>
    //   <GoldBox>
    //     <FontAwesomeIcon icon={faCoins} style={{ color: "yellow" }} />
    //     <span>
    //       <CountUp start={prevGold} end={currentGold} />
    //     </span>
    //   </GoldBox>
    //   <GridContainer>
    //     {GateArray.map((ContentName) => {
    //       return (
    //         <ContentCard
    //           key={ContentName}
    //           AccountName={AccountName}
    //           CharacterName={CharacterName}
    //           ContentsName={ContentName}
    //         />
    //       );
    //     })}
    //   </GridContainer>
    // </Container>
  );
};

export default ConfigContent;

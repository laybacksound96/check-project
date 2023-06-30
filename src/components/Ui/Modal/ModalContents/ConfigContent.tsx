import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";
import { modalProp } from "../../../../atoms/modal";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContentSetting } from "../../../../atoms/Settings/ContentSetting";
import { Gates } from "../../../../atoms/Settings/Gates";
import calcCharacterGold from "./functions/calcCharacterGold";
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

interface IProps {
  prop: modalProp;
}
const ConfigContent = ({ prop: { AccountName, CharacterName } }: IProps) => {
  const {
    [AccountName]: { [CharacterName]: ContentState },
  } = useRecoilValue(ContentSetting);
  const {
    [AccountName]: { [CharacterName]: GatesContent },
  } = useRecoilValue(Gates);

  const GoldContents = Object.keys(ContentState).filter(
    (Name) => ContentState[Name].isGoldContents
  );

  const GateArray = [
    ...Object.keys(ContentState).filter((Name) => ContentState[Name].isVisible),
    ...Object.keys(ContentState).filter(
      (Name) => !ContentState[Name].isVisible
    ),
  ];

  const [currentGold, setCurrentGold] = useState(
    calcCharacterGold(GatesContent, ContentState) * 0.95
  );
  const [prevGold, setPrevGold] = useState(0);

  useEffect(() => {
    setCurrentGold((prev) => {
      setPrevGold(prev);
      return calcCharacterGold(GatesContent, ContentState);
    });
  }, [ContentState, GatesContent]);

  return (
    <Container>
      <p>골드획득 컨텐츠:</p>
      <div style={{ display: "flex" }}>
        {GoldContents.map((content) => {
          return <GoldContent key={content}>{content}</GoldContent>;
        })}
      </div>
      <GoldBox>
        <FontAwesomeIcon icon={faCoins} style={{ color: "yellow" }} />
        <span>
          <CountUp start={prevGold} end={currentGold} />
        </span>
      </GoldBox>
      <GridContainer>
        {GateArray.map((ContentName) => {
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

export default ConfigContent;

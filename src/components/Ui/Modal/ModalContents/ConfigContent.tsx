import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ContentCard from "./components/ContentCard";
import { ModalState } from "../../../../atoms/modal";
import { UserSetting } from "../../../../atoms/Settings/ContentSetting";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import calculateGold from "./functions/calculateGold";
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
  const {
    modalProp: { CharacterName, AccountName },
  } = useRecoilValue(ModalState);
  const {
    [`${AccountName}`]: {
      ContentsSetting,
      CharacterSetting: { [`${CharacterName}`]: CharacterState },
    },
  } = useRecoilValue(UserSetting);
  const [contents, setContenst] = useState<Array<string>>([]);
  const [goldContents, setGoldContents] = useState<Array<string>>([]);
  const [characterGold, setcharacterGold] = useState(0);
  const [startGold, setstartGold] = useState(0);
  useEffect(() => {
    const VisibleContents = Object.keys(ContentsSetting).filter(
      (ContentName) => CharacterState.Contents[ContentName].isVisible
    );
    const InVisibleContents = Object.keys(ContentsSetting).filter(
      (ContentName) => !CharacterState.Contents[ContentName].isVisible
    );
    setContenst(() => [...VisibleContents, ...InVisibleContents]);
  }, [CharacterState.Contents, ContentsSetting]);

  useEffect(() => {
    const goldContents = Object.keys(ContentsSetting).filter(
      (ContentName) => CharacterState.Contents[ContentName].isGoldContents
    );
    setGoldContents(() => goldContents);
    let gold = 0;
    for (let index in goldContents) {
      const contentName = goldContents[index];
      const { Gates } = CharacterState.Contents[contentName];
      gold += calculateGold(goldContents[index], Gates);
    }
    setcharacterGold((prev) => {
      setstartGold(prev);
      return gold;
    });
  }, [CharacterState.Contents, ContentsSetting]);

  return (
    <Container>
      <p>골드획득 컨텐츠:</p>
      <div style={{ display: "flex" }}>
        {goldContents.map((content) => {
          return <GoldContent key={content}>{content}</GoldContent>;
        })}
      </div>
      <GoldBox>
        <FontAwesomeIcon icon={faCoins} style={{ color: "yellow" }} />
        <span>
          <CountUp start={startGold} end={characterGold} />
        </span>
      </GoldBox>
      <GridContainer>
        {contents.map((ContentName) => {
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

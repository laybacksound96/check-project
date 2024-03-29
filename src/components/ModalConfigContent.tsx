import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ContentCard from "./Ui/Modal/ModalContents/components/ContentCard";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountGold from "./CountGold";
import ModalContainer from "./ModalContainer";
import { ModalConfigContentsAtom } from "../atoms/modal";
import { Accounts, Characters, Contents, IContent } from "../atoms/data";
import sortByCommander from "./Functions/sortCommander";
import { CommanderData } from "../atoms/commander";
import calculateIncome from "./Functions/calculateIncome";

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
const filterByName = (name: string, contents: IContent[]) => {
  const filteredContents = contents.filter(({ owner }) => {
    return name === owner;
  });
  return filteredContents;
};
const filterGoldContents = (contents: IContent[]) => {
  const goldContents = contents.filter(({ isVisble, isGoldContents }) => {
    return isVisble === true && isGoldContents === true;
  });
  return goldContents;
};
const GoldContens = ({ goldContents }: { goldContents: IContent[] }) => {
  return (
    <div style={{ display: "flex" }}>
      {goldContents.map(({ contentName }) => {
        return <GoldContent key={contentName}>{contentName}</GoldContent>;
      })}
    </div>
  );
};
const ModalConfigContent = () => {
  const commanderData = useRecoilValue(CommanderData);
  const [modal, closeModal] = useRecoilState(ModalConfigContentsAtom);
  const account = useRecoilValue(Accounts);
  const characters = useRecoilValue(Characters);
  const contents = useRecoilValue(Contents);
  const findData = (account_id: string) => {
    const charactersData = characters.find(({ owner }) => owner === account_id);
    const contentsData = contents.find(({ owner }) => owner === account_id);
    if (!charactersData || !contentsData) return null;
    return { charactersData, contentsData };
  };
  if (!modal.data) return null;
  const {
    data: { accountIndex, characterName },
  } = modal;
  const Data = findData(account[accountIndex]._id);
  if (!Data) return null;
  const { charactersData, contentsData } = Data;
  const filteredContents = filterByName(characterName, contentsData.contents);
  const goldContents = filterGoldContents(filteredContents);
  const characterIndex = charactersData.characters.findIndex(({ CharacterName }) => characterName === CharacterName);
  if (characterIndex === -1) return null;
  const { ItemMaxLevel } = charactersData.characters[characterIndex];
  return (
    <ModalContainer onClose={() => closeModal({ status: false })} title={`${characterName}의 캐릭터 표시 설정`}>
      <Container>
        <p>골드획득 컨텐츠:</p>
        <GoldContens goldContents={goldContents} />
        <GoldBox>
          <FontAwesomeIcon icon={faCoins} style={{ color: "yellow" }} />
          <CountGold income={calculateIncome(goldContents, commanderData)} />
        </GoldBox>
        <GridContainer>
          {sortByCommander(filteredContents).map((contents) => {
            return (
              <ContentCard
                key={contents.contentName}
                contents={contents}
                isGoldContents={goldContents.map(({ contentName }) => contentName).includes(contents.contentName)}
                level={ItemMaxLevel}
                accountIndex={accountIndex}
                characterName={characterName}
              />
            );
          })}
        </GridContainer>
      </Container>
    </ModalContainer>
  );
};

export default ModalConfigContent;

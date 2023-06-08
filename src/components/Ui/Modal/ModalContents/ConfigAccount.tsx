import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./ConfigContent";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AccountState,
  CheckBoxConfig,
  IAccountState,
  ModalState,
} from "../../../../atoms";
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
  const {
    modalProp: { CharacterName, AccountName },
  } = useRecoilValue(ModalState);
  const { [`${CharacterName}`]: contentsState } =
    useRecoilValue(CheckBoxConfig);
  const ContentNames = Object.keys(contentsState);
  const [
    {
      [`${AccountName}`]: {
        [`${CharacterName}`]: { GoldContents },
      },
    },
    setGoldContents,
  ] = useRecoilState(AccountState);
  const modifyGoldContents = (ContentsName: string) => {
    setGoldContents((prev) => {
      const copiedPrev: IAccountState = { ...prev ,[``]};
      return prev;
    });
  };
  return (
    <Container>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>{CharacterName && `${CharacterName}`}'s Settings</h1>
      </Header>
      {GoldContents.map((contents) => (
        <span key={contents}>{contents}</span>
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
                ChracterName={CharacterName}
                modifyGoldContents={modifyGoldContents}
              />
            )
          );
        })}
      </GridContainer>
    </Container>
  );
};

export default ConfigAccount;

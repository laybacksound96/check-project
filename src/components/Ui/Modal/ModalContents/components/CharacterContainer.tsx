import styled from "styled-components";
import { IFetchedCharacter } from "../AddAccount";

const CharacterCard = styled.div`
  width: auto;
  height: auto;
  background-color: ${(props) => props.theme.Color_4};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  border-radius: 10px;
  margin: 3px 3px;
  color: ${(props) => props.theme.Color_4};
  h1 {
    color: ${(props) => props.theme.TextColor_A};
  }
  span {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
    &:nth-child(2) {
      font-size: 0.85rem;
    }
  }
`;

interface Iprops {
  Characters: IFetchedCharacter[];
}
const CharacterContainer = ({ Characters }: Iprops) => {
  return (
    <>
      {Characters.map(
        ({ CharacterName, ItemMaxLevel, CharacterClassName }, index) =>
          index < 3 && (
            <CharacterCard key={index}>
              <h1>{CharacterName}</h1>
              <span>Lv. {ItemMaxLevel}</span>
              <span>{CharacterClassName}</span>
            </CharacterCard>
          )
      )}
      {Characters.length > 3 && (
        <CharacterCard>
          <h1>...</h1>
        </CharacterCard>
      )}
    </>
  );
};
export default CharacterContainer;

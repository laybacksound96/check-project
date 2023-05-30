import styled from "styled-components";
import { IFetchedCharacter } from "../AddAccount";

const CharacterCard = styled.div`
  width: auto;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: start;
  padding-left: 10px;
  align-items: center;
  border-radius: 10px;
  margin: 3px 3px;
`;

interface Iprops {
  isDupplicated: boolean;
  Characters: IFetchedCharacter[];
}
const CharacterContainer = ({ isDupplicated, Characters }: Iprops) => {
  if (isDupplicated) return null;
  return (
    <>
      {Characters.map(
        (character, index) =>
          index < 3 && (
            <CharacterCard key={index}>{character.CharacterName}</CharacterCard>
          )
      )}
      {Characters.length > 3 && <CharacterCard>...</CharacterCard>}
    </>
  );
};
export default CharacterContainer;

import { useRecoilState } from "recoil";
import { CharacterOrder } from "../../../atoms/OrdersSettings";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";
import { AxisLocker } from "../Functions/AxisLocker";
import ConfigContentButton from "../Components/ConfigContentButton";
import ConfigAccountButton from "../Components/ConfigAccountButton";
export const Character = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  font-size: ${dragIcon.row.fontSize}px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.5);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 50%;
    }
  }
  button {
    margin-top: 0px;
  }
  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const CharactersContainer = styled.div`
  display: flex;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.9rem;
    opacity: 40%;
    color: ${(props) => props.theme.TextColor_A};
    &:nth-child(2) {
      font-size: 0.85rem;
    }
  }
`;
interface IProps {
  AccountName: string;
  provided: DroppableProvided;
}
const DragCharacters = ({ AccountName, provided }: IProps) => {
  const [{ [AccountName]: characterOrder }, setCharacterOrder] =
    useRecoilState(CharacterOrder);
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <ConfigAccountButton AccountName={AccountName} />
      {characterOrder.map((CharacterName, index) => (
        <Draggable
          key={CharacterName}
          draggableId={CharacterName}
          index={index}
        >
          {(provided) => (
            <CharactersContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={AxisLocker(provided.draggableProps.style!, false)}
            >
              <Character {...provided.dragHandleProps}>
                <NameContainer>
                  {CharacterName}
                  <span>{"CharacterClassName"}</span>
                  <span>Lv {"ItemMaxLevel"}</span>
                </NameContainer>
                <ConfigContentButton
                  AccountName={AccountName}
                  CharacterName={CharacterName}
                />
              </Character>
            </CharactersContainer>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};
export default DragCharacters;

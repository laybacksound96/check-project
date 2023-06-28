import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { ContentsOrder, CharacterOrder } from "../../../atoms/order";
import { AxisLocker } from "../Functions/AxisLocker";
import getColorInFrequencyCounter from "../Functions/getColorFrequencyCounter";
import CheckBoxButton from "../Components/CheckBoxButton";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";
import useModal from "../../../CustomHooks/Modal/useModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { ContentsFrequency } from "../../../atoms/frequency";
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;
  font-size: ${dragIcon.column.fontSize}px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  AccountName: string;
}
const DragContents = ({ AccountName }: IProps) => {
  const [openModal] = useModal();
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const [{ [AccountName]: contentsOrder }, setContentsOrder] =
    useRecoilState(ContentsOrder);
  const [{ [AccountName]: characterOrder }, setCharacterOrder] =
    useRecoilState(CharacterOrder);
  const dragContentHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
    }
    return;
  };

  return (
    <>
      <DragDropContext onDragEnd={dragContentHandler}>
        <Droppable droppableId="Column" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex" }}
            >
              {contentsOrder.map((ContentName, index) => (
                <Draggable
                  draggableId={ContentName}
                  index={index}
                  key={ContentName}
                >
                  {(provided) => (
                    <ColumnContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={AxisLocker(provided.draggableProps.style!, true)}
                    >
                      <Name {...provided.dragHandleProps}>
                        {ContentName.length >= 7
                          ? `${ContentName.slice(0, 7)}...`
                          : ContentName}
                      </Name>
                      {characterOrder.map((CharacterName) => {
                        return (
                          <CheckBoxButton
                            key={CharacterName + ContentName}
                            CharacterName={CharacterName}
                            AccountName={AccountName}
                            ContentName={ContentName}
                            Color={getColorInFrequencyCounter(
                              contentsFrequency,
                              ContentName,
                              CharacterName
                            )}
                          />
                        );
                      })}
                    </ColumnContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Name
                onClick={() =>
                  openModal("ADD_CONTENT", {
                    AccountName,
                    CharacterName: "",
                  })
                }
              >
                +
              </Name>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default DragContents;

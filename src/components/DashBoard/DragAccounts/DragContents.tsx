import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

import { AxisLocker } from "../Functions/AxisLocker";
import CheckBoxButton from "../Components/CheckBoxButton";
import styled from "styled-components";
import { dragIcon } from "../../../Settings";
import useModal from "../../../CustomHooks/Modal/useModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { ContentsFrequency } from "../../../atoms/frequency";
import { CharacterOrder, ContentsOrder } from "../../../atoms/Settings/Orders";
import React, { useEffect } from "react";
import { getKey } from "../Functions/CalculateCheckbox";
import { Gates } from "../../../atoms/Settings/Gates";
import { ContentSetting } from "../../../atoms/Settings/ContentSetting";
import { LoginState } from "../../../atoms/login";
import { Data } from "../../../atoms/data";
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
  accountIndex: number;
}
const DragContents = ({ AccountName, accountIndex }: IProps) => {
  const [openModal] = useModal();
  const [data, setData] = useRecoilState(Data);
  const loggined = useRecoilValue(LoginState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const gates = useRecoilValue(Gates);
  const dragContentHandler = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId !== source.droppableId) return;
    // setContentsOrder((prev) => {
    //   const copiedOrder = [...prev[AccountName]];
    //   const target = copiedOrder[source.index];
    //   copiedOrder.splice(source.index, 1);
    //   copiedOrder.splice(destination?.index, 0, target);
    //   return { ...prev, [AccountName]: copiedOrder };
    // });
    return;
  };
  const { contentsOrder, characterOrder, contents } = data[accountIndex];
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
                  isDragDisabled={!loggined}
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
                          <div key={CharacterName}>button</div>
                          // <CheckBoxButton
                          //   key={CharacterName + ContentName}
                          //   CharacterName={CharacterName}
                          //   AccountName={AccountName}
                          //   ContentName={ContentName}
                          //   Color={"color"}
                          // />
                        );
                      })}
                    </ColumnContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default React.memo(DragContents);

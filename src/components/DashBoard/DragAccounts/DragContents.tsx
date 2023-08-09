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
import { Accounts } from "../../../atoms/data";
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
  index: number;
}
const DragContents = ({ index }: IProps) => {
  const [openModal] = useModal();
  const loggined = useRecoilValue(LoginState);
  const contentsFrequency = useRecoilValue(ContentsFrequency);
  const [accountOrder, setAccount] = useRecoilState(Accounts);
  const { characterOrder, contentsOrder } = accountOrder[index];
  const dragContentHandler = (dragInfo: DropResult) => {
    // const { destination, source } = dragInfo;
    // if (!destination) return;
    // if (destination?.droppableId !== source.droppableId) return;
    // setContentsOrder((prev) => {
    //   const copiedOrder = [...prev[AccountName]];
    //   const target = copiedOrder[source.index];
    //   copiedOrder.splice(source.index, 1);
    //   copiedOrder.splice(destination?.index, 0, target);
    //   return { ...prev, [AccountName]: copiedOrder };
    // });
    // return;
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
                      {/* {characterOrder.map((CharacterName) => {
                        const gate =
                          gates[AccountName][CharacterName][ContentName];
                        const Key = getKey(ContentName, gate);

                        const color = contentsFrequency.hasOwnProperty(Key)
                          ? contentsFrequency[Key].Color
                          : "";
                        return (
                          <CheckBoxButton
                            key={CharacterName + ContentName}
                            CharacterName={CharacterName}
                            AccountName={AccountName}
                            ContentName={ContentName}
                            Color={color}
                          />
                        );
                      })} */}
                    </ColumnContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {/* {loggined && (
                <Name
                  onClick={() => {
                    if (!loggined) return;
                    openModal("ADD_CONTENT", {
                      AccountName,
                      CharacterName: "",
                    });
                  }}
                >
                  +
                </Name>
              )} */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default React.memo(DragContents);

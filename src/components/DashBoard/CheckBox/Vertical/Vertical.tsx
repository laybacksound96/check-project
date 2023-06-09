import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AccountState, ContentsState } from "../../../../atoms/atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";
import styled from "styled-components";

import { ModalEnum, ModalState } from "../../../../atoms/modal";
import { VisibledColumns } from "../../../../atoms/order";
import syncWidth from "../../Functions/syncWidth";

const CardContainer = styled.div`
  display: flex;
`;
function CheckBoxColumn() {
  const Contents = useRecoilValue(ContentsState);
  const Accounts = useRecoilValue(AccountState);
  const [visibledColumns, setVisibledColumns] = useRecoilState(VisibledColumns);

  useEffect(() => {
    setVisibledColumns((prev) => syncWidth(Contents, prev));
  }, [Contents, setVisibledColumns]);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setVisibledColumns((prev) => {
        const copiedPrev = [...prev];
        const copiedObject = copiedPrev[source.index];
        copiedPrev.splice(source.index, 1);
        copiedPrev.splice(destination?.index, 0, copiedObject);
        return [...copiedPrev];
      });
    }
    return;
  };

  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.ADD_CONTENT;
      return { ...copiedPrev };
    });
  };

  return Object.keys(Accounts).length ? (
    <div style={{ display: "flex" }}>
      <div style={{ width: "210px" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one" direction="horizontal">
          {(provided) => (
            <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
              {visibledColumns.map((contents, index) => (
                <Draggable
                  draggableId={contents.name}
                  index={index}
                  key={contents.name}
                >
                  {(provided) => (
                    <Card
                      Column={contents.name}
                      parentProvided={provided}
                      index={index}
                      style={AxisLocker(provided.draggableProps.style!, true)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Name onClick={openModal}>+</Name>
            </CardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  ) : null;
}
export default React.memo(CheckBoxColumn);

import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AccountsState,
  ColumnState,
  ModalEnum,
  ModalState,
} from "../../../../atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";

function CheckBoxColumn() {
  const [Columns, setColumns] = useRecoilState(ColumnState);

  const Accounts = useRecoilValue(AccountsState);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setColumns((prev) => {
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

  return Accounts.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex", marginLeft: "200px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {Columns.map(
              (Column, index) =>
                Column.isVisible && (
                  <Draggable
                    draggableId={Column.contentName}
                    index={index}
                    key={Column.contentName}
                  >
                    {(provided) => (
                      <Card
                        Column={Column.contentName}
                        parentProvided={provided}
                        style={AxisLocker(provided.draggableProps.style!, true)}
                      />
                    )}
                  </Draggable>
                )
            )}
            {provided.placeholder}
            <Name onClick={openModal}>+</Name>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}
export default React.memo(CheckBoxColumn);

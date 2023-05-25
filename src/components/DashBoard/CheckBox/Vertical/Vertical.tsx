import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  CheckboxesState,
  ColumnState,
  IColumnState,
  ModalEnum,
  ModalState,
} from "../../../../atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";

function CheckBoxColumn() {
  const Columns = useRecoilValue(ColumnState);
  const Accounts = useRecoilValue(CheckboxesState);
  const [visibledColumns, setVisibledColumns] = useState<IColumnState[]>([]);

  useEffect(() => {
    setVisibledColumns(() =>
      Columns.filter((column) => column.isVisible === true)
    );
  }, [Columns]);
  console.log(Columns);
  console.log(visibledColumns);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex", marginLeft: "200px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {visibledColumns.map((Column, index) => (
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
            ))}
            {provided.placeholder}
            <Name onClick={openModal}>+</Name>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}
export default React.memo(CheckBoxColumn);

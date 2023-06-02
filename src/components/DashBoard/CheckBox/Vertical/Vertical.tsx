import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ContentsState,
  ModalEnum,
  ModalState,
  VisibledColumns,
} from "../../../../atoms";

import Card, { Name } from "./Vertical__card";
import { AxisLocker } from "../../Functions/AxisLocker";

function CheckBoxColumn() {
  const Columns = useRecoilValue(ContentsState);

  const [visibledColumns, setVisibledColumns] = useRecoilState(VisibledColumns);

  useEffect(() => {
    setVisibledColumns(() => {
      const newColumnArray = [];
      for (let key in Columns) {
        if (Columns[key].isVisible === false) continue;
        newColumnArray.push(key);
      }
      return [...newColumnArray];
    });
  }, [Columns, setVisibledColumns]);

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

  return visibledColumns.length ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="one" direction="horizontal">
        {(provided) => (
          <div
            style={{ display: "flex", marginLeft: "200px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {visibledColumns.map((name, index) => (
              <Draggable draggableId={name} index={index} key={name}>
                {(provided) => (
                  <Card
                    Column={name}
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

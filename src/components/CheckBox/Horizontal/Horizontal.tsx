import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { CharacterState } from "../../../atoms";

import DroppableSpace from "./Horizontal__Droppable";

function Horizontal() {
  const setChars = useSetRecoilState(CharacterState);
  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setChars((prev) => {
        const charStateCopy = [...prev];
        const copiedObject = { ...charStateCopy[source.index] };
        charStateCopy.splice(source.index, 1);
        charStateCopy.splice(destination?.index, 0, copiedObject);
        return [...charStateCopy];
      });
    }
    return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableSpace boardId={"계정컨테이너의id이므로나중에수정"} />
    </DragDropContext>
  );
}
export default Horizontal;

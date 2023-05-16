import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { CharacterState } from "../../../atoms";
import DroppableSpace from "./Horizontal__Droppable";

interface IAccountProps {
  account: { Characters: string[] };
  index: number;
}

function Horizontal({ index, account }: IAccountProps) {
  const setChars = useSetRecoilState(CharacterState);

  const onDragEnd = (dragInfo: DropResult) => {
    const { destination, source } = dragInfo;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setChars((prev) => {
        console.log(prev);
        // const charStateCopy = [...prev];
        // const copiedObject = { ...charStateCopy[source.index] };
        // charStateCopy.splice(source.index, 1);
        // charStateCopy.splice(destination?.index, 0, copiedObject);
        // return [...charStateCopy];
        return prev;
      });
    }
    return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableSpace
        boardId={"" + index}
        accountIndex={index}
        account={account}
      />
    </DragDropContext>
  );
}
export default Horizontal;

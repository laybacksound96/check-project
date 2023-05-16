import {
  DraggableProvided,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transition: ease-in-out 0.1s;
  }
`;
interface IRowCardProp {
  Row: string;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
}

function RowCard({ Row, parentProvided, style }: IRowCardProp) {
  return (
    <Name
      ref={parentProvided.innerRef}
      {...parentProvided.dragHandleProps}
      {...parentProvided.draggableProps}
      style={style}
    >
      {Row}
    </Name>
  );
}
export default RowCard;

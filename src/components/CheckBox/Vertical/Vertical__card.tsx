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

  min-width: 50px;
  width: auto;
  height: 50px;

  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
interface IColumnCardProp {
  Column: string;
  parentProvided: DraggableProvided;
  style: DraggingStyle | NotDraggingStyle;
}

function ColumnCard({ Column, parentProvided, style }: IColumnCardProp) {
  return (
    <Name
      ref={parentProvided.innerRef}
      {...parentProvided.dragHandleProps}
      {...parentProvided.draggableProps}
      style={style}
    >
      {Column}
    </Name>
  );
}
export default ColumnCard;

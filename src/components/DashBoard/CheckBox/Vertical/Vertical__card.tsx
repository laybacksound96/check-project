import {
  DraggableProvided,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { dragIcon } from "../../../../Settings";

export const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: ${dragIcon.icon.edgeLength}px;
  height: ${dragIcon.icon.edgeLength}px;

  border-radius: 5px;
  font-size: ${dragIcon.column.fontSize}px;
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

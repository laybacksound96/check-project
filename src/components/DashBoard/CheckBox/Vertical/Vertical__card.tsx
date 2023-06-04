import {
  DraggableProvided,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { dragIcon } from "../../../../Settings";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { VisibledColumns } from "../../../../atoms";

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
  index: number;
  style: DraggingStyle | NotDraggingStyle;
}

function ColumnCard({ Column, parentProvided, style, index }: IColumnCardProp) {
  const elementRef = useRef<HTMLDivElement>(null);
  const setVisibledColumns = useSetRecoilState(VisibledColumns);
  useEffect(() => {
    if (elementRef.current) {
      const elementWidth = elementRef.current.offsetWidth;
      setVisibledColumns((prev) => {
        const copiedPrev = [...prev];
        const copiedContents = { ...copiedPrev[index] };
        copiedContents.width = elementWidth;
        copiedPrev[index] = copiedContents;
        return copiedPrev;
      });
    }
  }, [setVisibledColumns, index]);

  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.dragHandleProps}
      {...parentProvided.draggableProps}
      style={style}
    >
      <Name ref={elementRef}>{Column}</Name>
    </div>
  );
}
export default ColumnCard;

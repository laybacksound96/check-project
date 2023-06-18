import {
  DraggableProvided,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { dragIcon } from "../../../../Settings";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

import { ContentsState, IContents } from "../../../../atoms/atoms";

export const Name = styled.div`
  display: flex;
  flex-direction: column;
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

  const setContentsState = useSetRecoilState(ContentsState);

  useEffect(() => {
    if (elementRef.current) {
      const elementWidth = elementRef.current.offsetWidth;
      setContentsState((prev) => {
        const copiedPrev: IContents = {
          ...prev,
          [Column]: { ...prev[Column], width: elementWidth },
        };

        return copiedPrev;
      });
    }
  }, [setContentsState, Column]);

  return (
    <div
      ref={parentProvided.innerRef}
      {...parentProvided.dragHandleProps}
      {...parentProvided.draggableProps}
      style={style}
    >
      <Name ref={elementRef}>
        {Column.length >= 7 ? `${Column.slice(0, 7)}...` : Column}
      </Name>
    </div>
  );
}
export default ColumnCard;

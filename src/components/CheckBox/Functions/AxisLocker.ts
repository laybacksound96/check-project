import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export function AxisLocker(style: DraggingStyle | NotDraggingStyle) {
  if (style?.transform) {
    const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
    return {
      ...style,
      transform: axisLockX,
    };
  }
  return style;
}

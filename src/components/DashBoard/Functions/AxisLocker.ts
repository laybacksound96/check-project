import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export function AxisLocker(
  style: DraggingStyle | NotDraggingStyle,
  isHorizontal: boolean
) {
  if (style?.transform) {
    const axisLockX = `${style.transform.split(",").shift()}, 0px)`;
    const axisLockY = `translate(0px,${style.transform.split(",").pop()}`;
    let LockString;
    isHorizontal ? (LockString = axisLockX) : (LockString = axisLockY);
    return {
      ...style,
      transform: LockString,
    };
  }
  return style;
}

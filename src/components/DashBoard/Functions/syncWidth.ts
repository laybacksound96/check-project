import { dragIcon } from "../../../Settings";
import { IContents } from "../../../atoms/atoms";
import { Contents } from "../../../atoms/order";

const syncWidth = (entireColumns: IContents, visibledColumns: Contents[]) => {
  const newColumnArray: Contents[] = [];
  for (let contentName in entireColumns) {
    const {
      [`${contentName}`]: { isVisible },
    } = entireColumns;

    if (isVisible === false) continue;
    const foundColumn = visibledColumns.find((obj) => obj.name === contentName);
    const content: Contents = {
      name: contentName,
      width: foundColumn ? foundColumn.width : dragIcon.icon.edgeLength,
    };
    newColumnArray.push(content);
  }
  return [...newColumnArray];
};

export default syncWidth;

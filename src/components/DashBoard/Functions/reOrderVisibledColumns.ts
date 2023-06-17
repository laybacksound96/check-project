import { dragIcon } from "../../../Settings";
import { ICheckBoxconfig, IContents } from "../../../atoms/atoms";
import { Contents, IAccountOrder } from "../../../atoms/order";

const reOrderVisibledColumns = (
  visibledColumns: Contents[],
  entireColumns: IContents,
  accountOrder: IAccountOrder[],
  checkBoxConfig: ICheckBoxconfig
) => {
  const newColumnArray: Contents[] = [];
  const result: { [content: string]: boolean } = {};
  for (let contentName in entireColumns) {
    const {
      [`${contentName}`]: { isVisible },
    } = entireColumns;
    result[contentName] = false;

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

export default reOrderVisibledColumns;

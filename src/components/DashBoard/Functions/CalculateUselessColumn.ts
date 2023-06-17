import { ICheckBoxconfig } from "../../../atoms/atoms";
import { Contents, IAccountOrder } from "../../../atoms/order";

interface returnType {
  [contentName: string]: boolean;
}
const CalculateUselessColumn = (
  visibledColumns: Contents[],
  accountOrder: IAccountOrder[],
  checkBoxConfig: ICheckBoxconfig
): returnType => {
  const counter: returnType = {};
  for (let index in visibledColumns) {
    const { name: ContentName } = visibledColumns[index];
    counter[ContentName] = false;
    for (let accountIndex in accountOrder) {
      const { CharacterOrder } = accountOrder[accountIndex];
      for (let index in CharacterOrder) {
        const CharacterName = CharacterOrder[index];
        const { isVisible } = checkBoxConfig[CharacterName][ContentName];
        if (isVisible) counter[ContentName] = true;
      }
    }
  }
  return counter;
};

export default CalculateUselessColumn;

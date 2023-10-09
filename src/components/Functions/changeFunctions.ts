import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { ICheck } from "../../atoms/data";

export const changeAccountOrder = (
  dragInfo: DropResult,
  accountOrder: string[]
) => {
  const { destination, source } = dragInfo;
  if (destination?.droppableId !== source.droppableId) return accountOrder;

  const copiedAccountOrder = [...accountOrder];
  const target = copiedAccountOrder[source.index];
  copiedAccountOrder.splice(source.index, 1);
  copiedAccountOrder.splice(destination?.index, 0, target);
  return copiedAccountOrder;
};
export const changeOrder = (
  destination: DraggableLocation,
  source: DraggableLocation,
  characterOrder: string[]
) => {
  const result = [...characterOrder];
  const target = characterOrder[source.index];
  result.splice(source.index, 1);
  result.splice(destination?.index, 0, target);
  return result;
};
export const changeCharacterVisible = (
  characterOrder: string[],
  characterName: string
) => {
  const copiedCharacterOrder = [...characterOrder];
  const targetIndex = characterOrder.findIndex(
    (name) => name === characterName
  );
  const isVisible = characterOrder.includes(characterName);
  if (isVisible) {
    if (targetIndex === -1) return copiedCharacterOrder;
    copiedCharacterOrder.splice(targetIndex, 1);
  } else {
    copiedCharacterOrder.push(characterName);
  }
  return copiedCharacterOrder;
};
export const changeContentOrder = (
  destination: DraggableLocation,
  source: DraggableLocation,
  contentsOrder: string[]
) => {
  const result = [...contentsOrder];
  const target = contentsOrder[source.index];
  result.splice(source.index, 1);
  result.splice(destination?.index, 0, target);
  return result;
};
export const changeChecks = (
  checks: ICheck[],
  checkIndex: number,
  newCheck: { characterName: string; contentName: string }
) => {
  const copiedChecks = [...checks];
  if (checkIndex === -1) {
    copiedChecks.push(newCheck);
  } else {
    copiedChecks.splice(checkIndex, 1);
  }
  return copiedChecks;
};

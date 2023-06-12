import { ICharacterState } from "../../../../../atoms/atoms";

const initializerCharacterOrder = (characters: ICharacterState): string[] => {
  const result = [];
  for (let name in characters) {
    if (characters[name].IsGoldCharacter) result.push(name);
  }

  return result;
};

export default initializerCharacterOrder;

import { RecoilState, useRecoilState } from "recoil";
import { ICheckBoxconfig } from "../../../../../atoms";

export function useIsCleared(
  atom: RecoilState<ICheckBoxconfig>,
  CharacterName: string,
  ContentName: string
): [boolean, (newValue: boolean) => void] {
  const [value, setValue] = useRecoilState<ICheckBoxconfig>(atom);
  const {
    [CharacterName]: {
      [ContentName]: { isCleared },
    },
  } = value;
  const setNewValue = (newValue: boolean): void => {
    setValue((prev) => {
      const copiedPrev = {
        ...prev,
        [CharacterName]: {
          ...prev[CharacterName],
          [ContentName]: {
            ...prev[CharacterName][ContentName],
            isCleared: newValue,
          },
        },
      };
      return copiedPrev;
    });
  };
  return [isCleared, setNewValue];
}
export function useIsVisible(
  atom: RecoilState<ICheckBoxconfig>,
  CharacterName: string,
  ContentName: string
): [boolean, (newValue: boolean) => void] {
  const [value, setValue] = useRecoilState<ICheckBoxconfig>(atom);
  const {
    [CharacterName]: {
      [ContentName]: { isVisible },
    },
  } = value;
  const setNewValue = (newValue: boolean): void => {
    setValue((prev) => {
      const copiedPrev = {
        ...prev,
        [CharacterName]: {
          ...prev[CharacterName],
          [ContentName]: {
            ...prev[CharacterName][ContentName],
            isVisible: newValue,
          },
        },
      };
      return copiedPrev;
    });
  };
  return [isVisible, setNewValue];
}
export function useIsVisibleGates(
  atom: RecoilState<ICheckBoxconfig>,
  CharacterName: string,
  ContentName: string,
  GateIndex: number
): [boolean, (newValue: boolean) => void] {
  const [value, setValue] = useRecoilState<ICheckBoxconfig>(atom);
  const {
    [CharacterName]: {
      [ContentName]: { Gates },
    },
  } = value;
  const { isVisible } = Gates[GateIndex];
  const setNewValue = (newValue: boolean): void => {
    setValue((prev) => {
      const prevGatesArray = [...prev[CharacterName][ContentName].Gates];

      const copiedGate = { ...prevGatesArray[GateIndex], isVisible: newValue };
      prevGatesArray.splice(GateIndex, 1, copiedGate);
      const copiedPrev = {
        ...prev,
        [CharacterName]: {
          ...prev[CharacterName],
          [ContentName]: {
            ...prev[CharacterName][ContentName],
            Gates: prevGatesArray,
          },
        },
      };
      return copiedPrev;
    });
  };
  return [isVisible, setNewValue];
}
export function useDifficultyState(
  atom: RecoilState<ICheckBoxconfig>,
  CharacterName: string,
  ContentName: string,
  GateIndex: number
): [string, (newValue: string) => void] {
  const [value, setValue] = useRecoilState<ICheckBoxconfig>(atom);
  const {
    [CharacterName]: {
      [ContentName]: { Gates },
    },
  } = value;
  const { Difficulty } = Gates[GateIndex];
  const setNewValue = (newValue: string): void => {
    setValue((prev) => {
      const prevGatesArray = [...prev[CharacterName][ContentName].Gates];
      const copiedGate = { ...prevGatesArray[GateIndex], Difficulty: newValue };

      prevGatesArray.splice(GateIndex, 1, copiedGate);
      const copiedPrev = {
        ...prev,
        [CharacterName]: {
          ...prev[CharacterName],
          [ContentName]: {
            ...prev[CharacterName][ContentName],
            Gates: prevGatesArray,
          },
        },
      };
      return copiedPrev;
    });
  };
  return [Difficulty, setNewValue];
}

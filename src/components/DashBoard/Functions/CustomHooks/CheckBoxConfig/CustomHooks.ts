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
    setValue((prev) => prev);
  };
  return [isCleared, setNewValue];
}

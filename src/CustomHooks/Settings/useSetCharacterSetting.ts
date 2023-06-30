import { useSetRecoilState } from "recoil";
import { ContentStateSetting } from "../../atoms/Settings/ContentSetting";
import { CharacterSetting } from "../../atoms/Settings/CharacterSetting";
type Key = keyof ContentStateSetting;
function useSetCharacterSetting(
  AccountName: string,
  CharacterName: string
): (Key: Key, value: boolean | number) => void {
  const setCharacterSetting = useSetRecoilState(CharacterSetting);

  function setter(Key: Key, value: boolean | number) {
    setCharacterSetting((prev) => {
      return {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            [Key]: value,
          },
        },
      };
    });
  }
  return setter;
}
export default useSetCharacterSetting;

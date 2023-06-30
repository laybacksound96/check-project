import { useSetRecoilState } from "recoil";
import {
  ContentSetting,
  ContentStateSetting,
} from "../../atoms/Settings/ContentSetting";
type Key = keyof ContentStateSetting;
function useSetContentSetting(
  AccountName: string,
  CharacterName: string,
  ContentsName: string
): (Key: Key, value: boolean) => void {
  const setContentSetting = useSetRecoilState(ContentSetting);

  function setter(Key: Key, value: boolean) {
    setContentSetting((prev) => {
      return {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            [ContentsName]: {
              ...prev[AccountName][CharacterName][ContentsName],
              [Key]: value,
            },
          },
        },
      };
    });
  }
  return setter;
}
export default useSetContentSetting;

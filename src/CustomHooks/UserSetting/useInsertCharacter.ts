import { useRecoilState } from "recoil";
import { ICharacterState, UserSetting } from "../../atoms/userSetting";

function useCharacterSettings(
  AccountName: string
): (CharacterName: string, object: ICharacterState) => void {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const insertNewValue = (
    CharacterName: string,
    object: ICharacterState
  ): void => {
    const setting = userSetting[AccountName].CharacterSetting;
    if (setting.hasOwnProperty(CharacterName)) return;
    setUserSetting((prev) => {
      return {
        ...prev,
        AccountName: {
          ...prev[AccountName],
          CharacterState: {
            ...prev[AccountName].CharacterSetting,
            [`${CharacterName}`]: object,
          },
        },
      };
    });
  };
  return insertNewValue;
}

export default useCharacterSettings;

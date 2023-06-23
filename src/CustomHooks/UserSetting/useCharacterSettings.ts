import { useRecoilState } from "recoil";
import { ICharacterState, UserSetting } from "../../atoms/userSetting";

function useCharacterSettings(
  AccountName: string,
  CharacterName: string
): [
  ICharacterState,
  (Key: "IsGoldCharacter" | "isVisible") => void,
  (object: ICharacterState) => void
] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value = userSetting[AccountName].CharacterSetting[CharacterName];
  const setter = (Key: "IsGoldCharacter" | "isVisible") => {
    setUserSetting((prev) => {
      return {
        ...prev,
        [`${AccountName}`]: {
          ...prev[AccountName],
          CharacterSetting: {
            ...prev[AccountName].CharacterSetting,
            [`${CharacterName}`]: {
              ...prev[AccountName].CharacterSetting[CharacterName],
              [`${Key}`]: !value[Key],
            },
          },
        },
      };
    });
  };

  const insertNewValue = (object: ICharacterState): void => {
    setUserSetting((prev) => {
      return {
        ...prev,
        [`${AccountName}`]: {
          ...prev[AccountName],
          [`${CharacterName}`]: {
            ...prev[AccountName].CharacterSetting,
            [`${CharacterName}`]: object,
          },
        },
      };
    });
  };
  return [value, setter, insertNewValue];
}

export default useCharacterSettings;

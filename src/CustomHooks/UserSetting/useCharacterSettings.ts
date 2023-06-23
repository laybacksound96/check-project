import { useRecoilState } from "recoil";
import { ICharacterState, UserSetting } from "../../atoms/atoms";

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
  const setter = (Key: "IsGoldCharacter" | "isVisible") =>
    setUserSetting((prev) => {
      return {
        ...prev,
        AccountName: {
          ...prev[AccountName],
          CharacterState: {
            ...prev[AccountName].CharacterSetting,
            CharacterName: {
              ...prev[AccountName].CharacterSetting[CharacterName],
              [Key]: !value,
            },
          },
        },
      };
    });

  const insertNewValue = (object: ICharacterState): void => {
    setUserSetting((prev) => {
      return {
        ...prev,
        AccountName: {
          ...prev[AccountName],
          CharacterState: {
            ...prev[AccountName].CharacterSetting,
            CharacterName: object,
          },
        },
      };
    });
  };
  return [value, setter, insertNewValue];
}

export default useCharacterSettings;

import { useRecoilState } from "recoil";
import {
  ICharacterState,
  IGoldContents,
  UserSetting,
} from "../../atoms/userSetting";

function useCharacterSettings(
  AccountName: string,
  CharacterName: string
): [
  ICharacterState,
  (
    Key: "IsGoldCharacter" | "isVisible" | "GoldContents",
    Value: boolean | IGoldContents[]
  ) => void,
  (object: ICharacterState) => void
] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value = userSetting[AccountName].CharacterSetting[CharacterName];
  const setter = (
    Key: "IsGoldCharacter" | "isVisible" | "GoldContents",
    Value: boolean | IGoldContents[]
  ) => {
    setUserSetting((prev) => {
      return {
        ...prev,
        [`${AccountName}`]: {
          ...prev[AccountName],
          CharacterSetting: {
            ...prev[AccountName].CharacterSetting,
            [`${CharacterName}`]: {
              ...prev[AccountName].CharacterSetting[CharacterName],
              [`${Key}`]: Value,
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

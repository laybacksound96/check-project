import { useRecoilState } from "recoil";
import { UserSetting } from "../../atoms/atoms";

function useCharacterSettings(
  Key: "IsGoldCharacter" | "isVisible",
  AccountName: string,
  CharacterName: string
): [boolean, () => void] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value = userSetting[AccountName].CharacterState[CharacterName][Key];
  const setter = () =>
    setUserSetting((prev) => {
      return {
        ...prev,
        AccountName: {
          ...prev[AccountName],
          CharacterState: {
            ...prev[AccountName].CharacterState,
            CharacterName: {
              ...prev[AccountName].CharacterState[CharacterName],
              [Key]: !value,
            },
          },
        },
      };
    });
  return [value, setter];
}

export default useCharacterSettings;

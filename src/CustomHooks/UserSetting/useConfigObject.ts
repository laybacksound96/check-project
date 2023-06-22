import { useRecoilState } from "recoil";
import { UserSetting } from "../../atoms/atoms";

function useCharacterSettings(
  Key: "isGoldContents" | "isCleared" | "isVisible",
  AccountName: string,
  CharacterName: string,
  ContentName: string
): [boolean, () => void] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value =
    userSetting[AccountName].CharacterState[CharacterName].Contents[
      ContentName
    ][Key];
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
              Contents: {
                ...prev[AccountName].CharacterState[CharacterName].Contents,
                ContentName: {
                  ...prev[AccountName].CharacterState[CharacterName].Contents[
                    ContentName
                  ],
                  [Key]: !value,
                },
              },
            },
          },
        },
      };
    });
  return [value, setter];
}

export default useCharacterSettings;

import { useRecoilState } from "recoil";
import { ICharsContentState, UserSetting } from "../../atoms/atoms";

function useCharsContentSetting(
  AccountName: string,
  CharacterName: string,
  ContentName: string
): [
  ICharsContentState,
  (Key: "isGoldContents" | "isCleared" | "isVisible" | "isActivated") => void
] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value =
    userSetting[AccountName].CharacterSetting[CharacterName].Contents[
      ContentName
    ];
  const setter = (
    Key: "isGoldContents" | "isCleared" | "isVisible" | "isActivated"
  ) =>
    setUserSetting((prev) => {
      return {
        ...prev,
        AccountName: {
          ...prev[AccountName],
          CharacterSetting: {
            ...prev[AccountName].CharacterSetting,
            CharacterName: {
              ...prev[AccountName].CharacterSetting[CharacterName],
              Contents: {
                ...prev[AccountName].CharacterSetting[CharacterName].Contents,
                ContentName: {
                  ...prev[AccountName].CharacterSetting[CharacterName].Contents[
                    ContentName
                  ],
                  [Key]: !value[Key],
                },
              },
            },
          },
        },
      };
    });

  return [value, setter];
}

export default useCharsContentSetting;

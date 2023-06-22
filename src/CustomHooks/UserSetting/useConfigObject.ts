import { useRecoilState } from "recoil";
import { UserSetting } from "../../atoms/atoms";
interface Info {
  AccountName: string;
  CharacterName: string;
  ContentName: string;
}
function useConfigObject(
  Key: "isGoldContents" | "isCleared" | "isVisible" | "isActivated",
  { AccountName, CharacterName, ContentName }: Info
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

export default useConfigObject;

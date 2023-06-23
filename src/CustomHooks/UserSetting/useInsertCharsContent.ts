import { useRecoilState } from "recoil";
import { ICharsContentState, UserSetting } from "../../atoms/atoms";

function useInsertCharsContent(
  AccountName: string,
  CharacterName: string
): (ContentName: string, object: ICharsContentState) => void {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const insertNewValue = (
    ContentName: string,
    object: ICharsContentState
  ): void => {
    const setting =
      userSetting[AccountName].CharacterSetting[CharacterName].Contents;
    if (setting.hasOwnProperty(ContentName)) return;
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
                [`${ContentName}`]: object,
              },
            },
          },
        },
      };
    });
  };
  return insertNewValue;
}
export default useInsertCharsContent;

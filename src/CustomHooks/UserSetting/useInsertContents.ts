import { useRecoilState } from "recoil";
import { IContentState, IUserSetting, UserSetting } from "../../atoms/atoms";

function useInsertContents(
  AccountName: string
): (ContentName: string, object: IContentState) => void {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const insertNewValue = (ContentName: string, object: IContentState): void => {
    const setting = userSetting[AccountName].ContentsSetting;
    if (setting.hasOwnProperty(ContentName)) return;
    setUserSetting((prev) => {
      const copiedPrev: IUserSetting = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          ContentsSetting: {
            ...prev[AccountName].ContentsSetting,
            [`${ContentName}`]: object,
          },
        },
      };
      return copiedPrev;
    });
  };
  return insertNewValue;
}
export default useInsertContents;

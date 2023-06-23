import { useRecoilState } from "recoil";
import { IContentState, IUserSetting, UserSetting } from "../../atoms/atoms";

function useContentsSetting(
  AccountName: string,
  ContentName: string
): [IContentState, (key: "isVisible") => void] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const value = userSetting[AccountName].ContentsSetting[ContentName];
  const setter = (key: "isVisible"): void => {
    setUserSetting((prev) => {
      const copiedPrev: IUserSetting = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          ContentsSetting: {
            ...prev[AccountName].ContentsSetting,
            [ContentName]: {
              ...prev[AccountName].ContentsSetting[ContentName],
              isVisible: !value[key],
            },
          },
        },
      };
      return copiedPrev;
    });
  };
  return [value, setter];
}

export default useContentsSetting;

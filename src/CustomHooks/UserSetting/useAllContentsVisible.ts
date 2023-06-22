import { useRecoilState } from "recoil";
import { IUserSetting, UserSetting } from "../../atoms/atoms";

function useAllContentsVisible(
  AccountName: string,
  ContentName: string
): [boolean, () => void] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);
  const { isVisible } = userSetting[AccountName].AllContentState[ContentName];

  const setNewValue = (): void => {
    setUserSetting((prev) => {
      const copiedPrev: IUserSetting = {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          AllContentState: {
            ...prev[AccountName].AllContentState,
            [ContentName]: {
              ...prev[AccountName].AllContentState[ContentName],
              isVisible: !isVisible,
            },
          },
        },
      };
      return copiedPrev;
    });
  };
  return [isVisible, setNewValue];
}

export default useAllContentsVisible;

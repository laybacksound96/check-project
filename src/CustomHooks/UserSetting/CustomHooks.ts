import { RecoilState, useRecoilState } from "recoil";
import { IUserSetting } from "../../atoms/atoms";

export function useAllContentsVisible(
  atom: RecoilState<IUserSetting>,
  AccountName: string,
  ContentName: string
): [boolean, () => void] {
  const [UserSetting, setUserSetting] = useRecoilState<IUserSetting>(atom);
  const { isVisible } = UserSetting[AccountName].AllContentState[ContentName];
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

import { useRecoilState } from "recoil";
import { IGates, UserSetting } from "../../atoms/userSetting";

function useGates(
  AccountName: string,
  CharacterName: string,
  ContentName: string
): [
  (GateIndex: number) => IGates,
  (GateIndex: number, Value: boolean) => void
] {
  const [userSetting, setUserSetting] = useRecoilState(UserSetting);

  const getter = (GateIndex: number) =>
    userSetting[AccountName].CharacterSetting[CharacterName].Contents[
      ContentName
    ].Gates[GateIndex];

  const setter = (GateIndex: number, Value: boolean) =>
    setUserSetting((prev) => {
      const copiedPrev = {
        ...prev,
        [`${AccountName}`]: {
          ...prev[AccountName],
          CharacterSetting: {
            ...prev[AccountName].CharacterSetting,
            [`${CharacterName}`]: {
              ...prev[AccountName].CharacterSetting[CharacterName],
              Contents: {
                ...prev[AccountName].CharacterSetting[CharacterName].Contents,
                [`${ContentName}`]: {
                  ...prev[AccountName].CharacterSetting[CharacterName].Contents[
                    ContentName
                  ],
                  Gates: [
                    ...prev[AccountName].CharacterSetting[CharacterName]
                      .Contents[ContentName].Gates,
                  ],
                },
              },
            },
          },
        },
      };
      const newGateData: IGates = { ...getter(GateIndex), isVisible: !Value };
      copiedPrev[AccountName].CharacterSetting[CharacterName].Contents[
        ContentName
      ].Gates[GateIndex] = newGateData;
      return copiedPrev;
    });

  return [getter, setter];
}

export default useGates;

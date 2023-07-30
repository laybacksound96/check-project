import useModal from "../../../CustomHooks/Modal/useModal";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState } from "../../../atoms/login";
import { CharacterSetting } from "../../../atoms/Settings/CharacterSetting";
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;

  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 7px 7px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const ConfigContentButton = ({
  AccountName,
  CharacterName,
}: {
  AccountName: string;
  CharacterName: string;
}) => {
  const [ConfigAccount] = useModal();
  const loggined = useRecoilValue(LoginState);
  const [
    {
      [AccountName]: {
        [CharacterName]: { isVisible: isVisibleChar },
      },
    },
    setCharacterSetting,
  ] = useRecoilState(CharacterSetting);
  const handleVisible = () => {
    setCharacterSetting((prev) => {
      return {
        ...prev,
        [AccountName]: {
          ...prev[AccountName],
          [CharacterName]: {
            ...prev[AccountName][CharacterName],
            isVisible: !isVisibleChar,
            IsGoldCharacter: isVisibleChar ? false : false,
          },
        },
      };
    });
  };
  return (
    <>
      {loggined && (
        <ButtonContainer>
          <FontAwesomeIcon onClick={() => handleVisible()} icon={faEye} />
          <FontAwesomeIcon
            onClick={() => {
              if (!loggined) return;
              ConfigAccount("CONFIG_CONTENT", {
                AccountName,
                CharacterName,
              });
            }}
            icon={faGear}
            size="lg"
          />
        </ButtonContainer>
      )}
    </>
  );
};
export default ConfigContentButton;

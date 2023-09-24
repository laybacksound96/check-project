import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
import {
  ModalConfigAccountAtom,
  ModalConfigContentsAtom,
} from "../atoms/modal";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { AccountOrder } from "../atoms/data";
import { UserState } from "../atoms/fetchData";
import { patchCharacter } from "../util/fetch";
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  padding-right: 5px;
  padding-top: 5px;
  svg {
    border-radius: 10px;
    opacity: 0%;
    padding: 10px 10px;
  }
  svg:hover {
    opacity: 100%;
    background-color: rgba(100, 100, 100, 0.7);
  }
`;
const ButtonConfigContent = ({
  index,
  CharacterName,
}: {
  index: number;
  CharacterName: string;
}) => {
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const userState = useRecoilValue(UserState);
  const openModal = useSetRecoilState(ModalConfigContentsAtom);
  const loggined = useRecoilValue(LoginState);
  const handleVisible = () => {
    setAccountOrder((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[index] };
      const copiedCharacterOrder = [...copiedData.characterOrder];
      const isVisible = copiedCharacterOrder.includes(CharacterName);
      const target = CharacterName;
      const targetIndex = copiedCharacterOrder.findIndex(
        (name) => name === target
      );
      if (isVisible) {
        if (targetIndex === -1) {
          return copiedAccounts;
        }
        copiedCharacterOrder.splice(targetIndex, 1);
      } else {
        copiedCharacterOrder.push(target);
      }
      if (userState !== "GUEST") {
        const userId = userState.user._id;
        patchCharacter(copiedData._id, userId, copiedCharacterOrder);
      }
      copiedData.characterOrder = copiedCharacterOrder;
      copiedAccounts[index] = copiedData;
      return copiedAccounts;
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
              openModal(true);
            }}
            icon={faGear}
            size="lg"
          />
        </ButtonContainer>
      )}
    </>
  );
};
export default ButtonConfigContent;

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/login";
import { ModalConfigContentsAtom } from "../atoms/modal";
import { AccountOrder } from "../atoms/data";
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
  accountIndex,
  characterName,
}: {
  accountIndex: number;
  characterName: string;
}) => {
  const setAccountOrder = useSetRecoilState(AccountOrder);
  const openModal = useSetRecoilState(ModalConfigContentsAtom);
  const loggined = useRecoilValue(LoginState);
  const handleVisible = () => {
    setAccountOrder((prev) => {
      const copiedAccounts = [...prev];
      const copiedData = { ...copiedAccounts[accountIndex] };
      const copiedCharacterOrder = [...copiedData.characterOrder];
      const isVisible = copiedCharacterOrder.includes(characterName);
      const target = characterName;
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
      // patchCharacter(copiedData._id, userId, copiedCharacterOrder);
      copiedData.characterOrder = copiedCharacterOrder;
      copiedAccounts[accountIndex] = copiedData;
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
              openModal({
                status: true,
                data: { accountIndex, characterName },
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
export default ButtonConfigContent;

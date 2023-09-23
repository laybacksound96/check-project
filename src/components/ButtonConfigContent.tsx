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
  AccountName,
  CharacterName,
}: {
  AccountName: string;
  CharacterName: string;
}) => {
  const openModal = useSetRecoilState(ModalConfigContentsAtom);
  const loggined = useRecoilValue(LoginState);
  return (
    <>
      {loggined && (
        <ButtonContainer>
          <FontAwesomeIcon onClick={() => {}} icon={faEye} />
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

import useModal from "../../../CustomHooks/Modal/useModal";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faEye } from "@fortawesome/free-regular-svg-icons";
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  padding-right: 5px;
  padding-top: 5px;
`;
const ConfigContentButton = ({
  AccountName,
  CharacterName,
}: {
  AccountName: string;
  CharacterName: string;
}) => {
  const [ConfigAccount] = useModal();
  return (
    <ButtonContainer>
      <FontAwesomeIcon onClick={() => {}} icon={faEye} />
      <FontAwesomeIcon
        onClick={() =>
          ConfigAccount("CONFIG_CONTENT", {
            AccountName,
            CharacterName,
          })
        }
        icon={faGear}
        size="lg"
      />
    </ButtonContainer>
  );
};
export default ConfigContentButton;

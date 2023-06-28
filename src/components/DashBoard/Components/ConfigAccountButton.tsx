import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dragIcon } from "../../../Settings";
import styled from "styled-components";
import useModal from "../../../CustomHooks/Modal/useModal";
const Character = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  padding-left: 5px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  svg {
    opacity: 20%;
    font-size: 30px;
    margin-left: 5px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
    svg {
      opacity: 100%;
    }
  }
`;

const ConfigAccountButton = ({ AccountName }: { AccountName: string }) => {
  const [openModal] = useModal();
  return (
    <>
      <Character
        onClick={() =>
          openModal("CONFIG_ACCOUNT", {
            AccountName,
            CharacterName: "",
          })
        }
      >
        <FontAwesomeIcon icon={faGear} size="lg" />
      </Character>
    </>
  );
};

export default ConfigAccountButton;

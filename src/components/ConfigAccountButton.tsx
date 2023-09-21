import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";
import useModal from "../CustomHooks/useModal";
import { dragIcon } from "../Settings";
import { LoginState } from "../atoms/login";
interface IStyle {
  loggined: boolean;
}
const Character = styled.div<IStyle>`
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
  ${(prop) =>
    prop.loggined &&
    css`
      &:hover {
        background-color: rgba(255, 255, 255, 0.231);
        transition: ease-in-out 0.1s;
        svg {
          opacity: 100%;
        }
      }
    `}
`;

const ConfigAccountButton = ({ AccountName }: { AccountName: string }) => {
  const loggined = useRecoilValue(LoginState);
  const [openModal] = useModal();
  return (
    <>
      <Character
        loggined={loggined}
        onClick={() => {
          if (!loggined) return;
          openModal("CONFIG_ACCOUNT", {
            AccountName,
            CharacterName: "",
          });
        }}
      >
        {loggined && <FontAwesomeIcon icon={faGear} size="lg" />}
      </Character>
    </>
  );
};

export default ConfigAccountButton;

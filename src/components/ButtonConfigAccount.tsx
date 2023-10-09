import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { useSetRecoilState } from "recoil";
import { dragIcon } from "../Settings";
import { ModalConfigAccountAtom } from "../atoms/modal";
import { useRouteLoaderData } from "react-router-dom";
import { loadToken } from "../util/auth";
interface IStyle {
  loggined: boolean;
}
const Character = styled.div<IStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: ${dragIcon.icon.edgeLength}px;
  border-radius: 5px;
  svg {
    cursor: pointer;
    opacity: 20%;
    font-size: 30px;
  }
  ${(prop) =>
    prop.loggined &&
    css`
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.231);
        transition: ease-in-out 0.1s;
        svg {
          opacity: 100%;
        }
      }
    `}
`;

const ButtonConfigAccount = ({ index }: { index: number }) => {
  const loggined = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  const openModal = useSetRecoilState(ModalConfigAccountAtom);

  return (
    <>
      <Character
        loggined={loggined ? true : false}
        onClick={() => {
          if (!loggined) return;
          openModal({ status: true, index });
        }}
      >
        {loggined && <FontAwesomeIcon icon={faGear} size="lg" />}
      </Character>
    </>
  );
};

export default ButtonConfigAccount;

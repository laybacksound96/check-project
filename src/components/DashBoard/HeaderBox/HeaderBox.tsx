import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Contents from "./Contents";
import { useSetRecoilState } from "recoil";
import { ModalEnum, ModalState } from "../../../atoms";

const HeaderBoxStyle = styled.header`
  position: relative;
  min-width: auto;
  height: auto;
  border-radius: 30px;
  padding: 30px;
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
  }
  h1 {
    display: inline;
    font-size: 30px;
  }
  svg {
    position: absolute;
    top: 30px;
    right: 30px;
    margin-top: 5px;
    font-size: 25px;
  }
`;
interface RouteParams {
  userId: string;
}
const HeaderBox = () => {
  const setIsModalOpen = useSetRecoilState(ModalState);
  const openModal = () => {
    setIsModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = true;
      copiedPrev.modalType = ModalEnum.ADD_CONTENT;
      return { ...copiedPrev };
    });
  };
  const { userId } = useParams<RouteParams>();
  return (
    <HeaderBoxStyle>
      <h1>{userId}님의 Sheet</h1>
      <FontAwesomeIcon onClick={openModal} icon={faGear} size="lg" />
      <hr></hr>
      <Contents />
    </HeaderBoxStyle>
  );
};

export default HeaderBox;

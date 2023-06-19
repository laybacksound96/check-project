import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Contents from "./Contents";
import useModal from "../../../CustomHooks/Modal/useModal";

const HeaderBoxStyle = styled.header`
  position: relative;
  min-width: auto;
  height: auto;
  border-radius: 30px;
  padding: 30px;

  background-color: ${(props) => props.theme.Color_1};
  border-color: ${(props) => props.theme.Color_4};
  border-style: solid;
  border-width: 3px;

  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  header {
    h1 {
      display: inline;
      font-size: 30px;
      color: ${(props) => props.theme.TextColor_A};
    }
  }

  svg {
    height: 40px;
    width: 40px;
    padding: 5px;
    border-radius: 10px;

    position: absolute;
    top: 20px;
    right: 30px;
    margin-top: 5px;
    font-size: 25px;
    &:hover {
      background-color: #ffffff71;
    }
  }
`;
interface RouteParams {
  userId: string;
}
const HeaderBox = () => {
  const [openModal] = useModal("CONFIG_CONTENT");
  const { userId } = useParams<RouteParams>();

  return (
    <HeaderBoxStyle>
      <header>
        <h1>{userId}님의 Sheet</h1>
        <FontAwesomeIcon onClick={() => openModal()} icon={faGear} size="lg" />
      </header>
      <Contents />
    </HeaderBoxStyle>
  );
};

export default HeaderBox;

import styled from "styled-components";
import Vertical from "./Vertical/Vertical";
import Horizontal from "./Horizontal/Horizontal";

export const CheckBoxStyle = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  padding: 30px 40px;
  border-radius: 15px;
  margin-bottom: 150px;
`;
const CheckBox = () => {
  return (
    <CheckBoxStyle>
      <Vertical />
      <Horizontal />
    </CheckBoxStyle>
  );
};

export default CheckBox;

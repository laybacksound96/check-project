import styled from "styled-components";
import Vertical from "./Vertical/Vertical";
import Horizontal from "./Horizontal/Horizontal";

export const CheckBoxStyle = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.Color_1};
  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-color: ${(props) => props.theme.Color_4};
  border-width: 3px;

  padding: 30px 40px;
  border-radius: 15px;
  margin-bottom: 150px;
`;
const CheckBox = () => {
  return (
    <CheckBoxStyle>
      <Horizontal />
    </CheckBoxStyle>
  );
};

export default CheckBox;

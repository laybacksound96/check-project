import styled from "styled-components";

export const HeaderBox = styled.header`
  position: relative;
  width: 700px;
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
export const Container = styled.main`
  display: flex;
  width: 700px;
  width: auto;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1;
`;
export const CheckBoxContainer = styled.div`
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

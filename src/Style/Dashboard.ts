import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: auto;

  flex-direction: column;
  justify-content: start;
  align-items: center;

  header {
    width: inherit;
  }
`;
export const HeaderBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 30px;
  padding: 30px;
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
  }
  h1 {
    font-size: 30px;
  }
  header {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  svg {
    margin-top: 5px;
    font-size: 25px;
  }
`;
export const Contents = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-auto-rows: 60px;
  gap: 10px;
  margin-top: 30px;
`;

const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);}
 `;
export const ContentStyle = styled.li`
  margin: 0 10px;
  text-align: center;
  border-radius: 10px;
  width: auto;
  max-width: 200px;
  min-width: 120px;
  height: 50px;
  line-height: 50px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};

  animation: ${bump} 300ms ease-out;
`;
export const CheckBoxContainer = styled.div`
  background-color: ${(props) => props.theme.subColor};
  * {
    color: ${(props) => props.theme.bgColor};
  }
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: inherit;
  padding: 30px 40px;
  border-radius: 15px;
  margin-bottom: 150px;
`;

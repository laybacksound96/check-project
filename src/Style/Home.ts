import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7%;
  margin-bottom: 300px;
  div * {
    display: flex;
    align-items: start;
  }
  h1 {
    font-size: 160px;
    margin-bottom: 10px;
  }
  span {
    font-size: 30px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    width: 40px;
    height: 100%;
    margin: none;
    margin-right: 20px;
  }
  a {
    width: 150px;
    margin-left: 15px;
    font-size: 17px;
    &:hover {
      color: #8c92f5;
    }
  }
`;
export const LoginDiscordBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 10px;

  width: 300px;
  height: 50px;

  border: none;
  border-radius: 15px;

  background-color: #6e78ea;
  color: white;

  font-size: 20px;
  &:hover {
    background-color: #8c92f5;
  }
  p {
    &:hover {
      color: white;
    }
  }
`;
export const Article = styled.article`
  height: 300px;
  background-color: ${(props) => props.theme.Color_1};
  padding-left: 150px;
  padding-top: 100px;
  p {
    width: 600px;
    font-size: 20px;
  }
  div {
    display: flex;
    justify-content: start;
  }
  h1 {
    font-size: 60px;
    color: ${(props) => props.theme.Color_4};
    margin-bottom: 15px;
  }
`;
export const ImgFake = styled.div`
  margin-left: 200px;
  width: 300px;
  height: auto;
  background-color: #000000;
`;

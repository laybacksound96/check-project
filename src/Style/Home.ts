import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: start;
  height: 750px;
`;
export const Section = styled.section`
  margin-top: 200px;
  margin-left: 150px;
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
  height: 3000px;
  background-color: ${(props) => props.theme.bgColor};
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
    color: ${(props) => props.theme.accentColor};
    margin-bottom: 15px;
  }
`;
export const ImgFake = styled.div`
  margin-left: 200px;
  width: 300px;
  height: auto;
  background-color: #000000;
`;
export const Footer = styled.footer`
  background-color: #181924;
  color: ${(props) => props.theme.accentColor};
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
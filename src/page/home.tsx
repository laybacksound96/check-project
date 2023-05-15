import styled from "styled-components";

import { ReactComponent as DiscordIcon } from "../discord-icon.svg";
const Header = styled.header`
  display: flex;
  justify-content: start;
`;
const Section = styled.section`
  margin-top: 200px;
  margin-left: 150px;
  div * {
    display: flex;
    align-items: start;
  }
  h1 {
    font-size: 130px;
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
    margin-left: 15px;
    font-size: 17px;
    &:hover {
      color: #8c92f5;
    }
  }
`;

const LoginDiscordBtn = styled.button`
  background-color: #6e78ea;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 300px;
  height: 50px;
  border: none;
  color: white;
  border-radius: 15px;
  font-size: 20px;
  &:hover {
    background-color: #8c92f5;
  }
  p {
    padding-bottom: 3px;
  }
`;

function home() {
  const loginHandlerDiscord = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("인증콜백 여기에 넣자");
  };
  return (
    <Header>
      <Section>
        <h1>Check.loa</h1>
        <div>
          <span>간편하고 똑똑한 일정관리 앱</span>
          <LoginDiscordBtn onClick={loginHandlerDiscord}>
            <DiscordIcon />
            <p>Discord로 로그인</p>
          </LoginDiscordBtn>
          <a href="/">로그인 없이 시작</a>
        </div>
      </Section>
    </Header>
  );
}

export default home;

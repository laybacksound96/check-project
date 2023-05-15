import styled from "styled-components";
import { ReactComponent as DiscordIcon } from "../discord-icon.svg";
import { fetchLogin } from "../util/fetch";

const Header = styled.header`
  display: flex;
  justify-content: start;
  height: 750px;
`;
const Section = styled.section`
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
    margin-left: 15px;
    font-size: 17px;
    &:hover {
      color: #8c92f5;
    }
  }
`;
const LoginDiscordBtn = styled.button`
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
const Article = styled.article`
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
const ImgFake = styled.div`
  margin-left: 200px;
  width: 300px;
  height: auto;
  background-color: #000000;
`;
const Footer = styled.footer`
  background-color: #181924;
  color: ${(props) => props.theme.accentColor};
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
async function discordLoginHandler(event: React.MouseEvent) {
  event.preventDefault();
  const response = await fetchLogin();
  window.location.href = response;
}

function Home() {
  return (
    <>
      <Header>
        <Section>
          <h1>Check.loa</h1>
          <div>
            <span>간편하고 똑똑한 일정관리 앱</span>
            <LoginDiscordBtn onClick={discordLoginHandler}>
              <DiscordIcon />
              <p>Discord로 로그인</p>
            </LoginDiscordBtn>
            <a href="/">로그인 없이 시작</a>
          </div>
        </Section>
      </Header>
      <Article>
        <h1>Lorem Ipsum</h1>
        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <ImgFake />
        </div>
      </Article>
      <Footer>
        <p>Contact us : 412#4615</p>
      </Footer>
    </>
  );
}

export default Home;

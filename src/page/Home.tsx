import { Navigate, useRouteLoaderData } from "react-router-dom";
import { Main, LoginDiscordBtn, Article, ImgFake } from "../Style/Home";
import { ReactComponent as DiscordIcon } from "../icons/discord-icon.svg";
import { fetchLogin } from "../util/fetch";
import { loadToken } from "../util/auth";

export async function discordLoginHandler(event: React.MouseEvent) {
  event.preventDefault();
  const response = await fetchLogin();
  window.location.href = response;
}

function Home() {
  const token = useRouteLoaderData("root") as ReturnType<typeof loadToken>;
  if (token) return <Navigate to={`/board/${token.user_id}`} />;
  return (
    <Main>
      <section>
        <h1>Check.loa</h1>
        <span>간편하고 똑똑한 일정관리 앱</span>
        <LoginDiscordBtn onClick={discordLoginHandler}>
          <DiscordIcon />
          <p>Discord로 로그인</p>
        </LoginDiscordBtn>
        <a href="/dashboard/GUEST">로그인 없이 시작</a>
      </section>
      <div style={{ height: "300px" }}></div>
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
    </Main>
  );
}

export default Home;

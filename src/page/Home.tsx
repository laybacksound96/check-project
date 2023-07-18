import { Navigate, useRouteLoaderData } from "react-router-dom";
import { Main, LoginDiscordBtn } from "../Style/Home";
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
        <h1>Checksheet</h1>
        <span>간편하고 똑똑한 일정관리 앱</span>
        <LoginDiscordBtn onClick={discordLoginHandler}>
          <DiscordIcon />
          <p>Discord로 로그인</p>
        </LoginDiscordBtn>
        <a href="/board/GUEST">로그인 없이 시작</a>
      </section>
    </Main>
  );
}

export default Home;

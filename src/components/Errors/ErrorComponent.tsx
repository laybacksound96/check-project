import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  opacity: 80%;
  span {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    &:nth-child(2) {
      flex-grow: 0.3;
    }
    button {
      cursor: pointer;
      margin-top: 20px;
      height: 60px;
      border: none;
      background-color: ${(props) => props.theme.Color_4};
      color: ${(props) => props.theme.TextColor_A};
      border-radius: 10px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.231);
        transition: ease-in-out 0.1s;
      }
    }
  }
`;
const NotFoundData = () => {
  function logoutHandler() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  }
  return (
    <Container>
      <div>
        <span>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </span>
        <p>존재하지 않는 유저입니다.</p>
      </div>

      <div>
        <p>문제가 있나요?</p>
        <button onClick={() => logoutHandler()}>
          이 버튼을 눌러 로그인을 다시 시도해볼 수 있어요
        </button>
      </div>
    </Container>
  );
};
export default ErrorComponent;

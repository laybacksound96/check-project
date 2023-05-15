import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  padding-top: 200px;
  padding-left: 20%;

  header {
    width: inherit;
  }
`;

const CreateBtn = styled.button`
  height: 70px;
  width: 500px;
  border: none;
  border-radius: 30px;
  background-color: ${(props) => props.theme.accentColor};
`;
const Board = styled.div`
  margin-top: 30px;
  width: 900px;
  height: 500px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.subColor};
`;
interface RouteParams {
  userId: string;
}
function Dashboard(props: any) {
  const charArr = useState();
  const { userId } = useParams<RouteParams>();

  return (
    <Container>
      <header>
        <h1>{userId}님의 Sheet</h1>
      </header>
      <Board></Board>
      <CreateBtn>+</CreateBtn>
    </Container>
  );
}

export default Dashboard;

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 80%;
  span {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;
const NotFoundData = () => {
  return (
    <Container>
      <span>
        <FontAwesomeIcon icon={faCircleExclamation} />
      </span>
      <p>존재하지 않는 유저입니다.</p>
    </Container>
  );
};
export default NotFoundData;

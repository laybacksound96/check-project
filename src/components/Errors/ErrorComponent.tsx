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

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <Container>
      <span>
        <FontAwesomeIcon icon={faCircleExclamation} />
      </span>
      <p>{message}</p>
    </Container>
  );
};
export default ErrorComponent;

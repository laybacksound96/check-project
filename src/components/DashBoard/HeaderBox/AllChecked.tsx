import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.Color_3};
  font-size: 1.2rem;
  span {
    color: #16be16;
    margin-bottom: 3px;
  }
  svg {
    margin-left: 5px;
    path {
      color: #16be16;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.Color_4};
  }
`;
const AllChecked = () => {
  return (
    <Container>
      <span>
        모든 일정을 완료했어요!
        <FontAwesomeIcon icon={faSquareCheck} />
      </span>
    </Container>
  );
};

export default AllChecked;

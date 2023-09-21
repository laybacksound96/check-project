import styled from "styled-components";
import { ISearchedData } from "../util/fetch";

const Container = styled.a`
  span:nth-child(2) {
    opacity: 60%;
    margin-left: 5px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.TextColor_B};
  }
  margin-bottom: 5px;
  padding: 3px;
  padding-left: 5px;
  border-radius: 5px;
  &:hover {
    background-color: #cdcdcd;
  }
`;

interface IProps {
  data: ISearchedData;
}

const UserCard = ({
  data: { user_id, user_name, global_name, discriminator },
}: IProps) => {
  return (
    <Container href={`/board/${user_id}`}>
      {global_name ? (
        <>
          <span>{global_name}</span>
          <span>{discriminator === "0" ? user_name : "#" + discriminator}</span>
        </>
      ) : (
        <span>
          {user_name}#{discriminator}
        </span>
      )}
    </Container>
  );
};
export default UserCard;

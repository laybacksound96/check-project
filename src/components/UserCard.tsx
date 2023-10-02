import styled from "styled-components";
import { ISearchedAccounts } from "../atoms/fetchData";

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
  data: ISearchedAccounts;
  name: string;
}

const UserCard = ({
  data: {
    owner: { _id, discriminator, global_name, user_name },
  },
  name,
}: IProps) => {
  return (
    <Container href={`/board/${_id}`}>
      {!global_name ? (
        <>
          <span>{name}</span>
          <span>
            {global_name}(
            {discriminator === "0" ? user_name : "#" + discriminator})
          </span>
        </>
      ) : (
        <>
          <span>{name}</span>
          <span>
            {user_name}#{discriminator}
          </span>
        </>
      )}
    </Container>
  );
};
export default UserCard;

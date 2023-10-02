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

const makeName = (
  user_name: string,
  discriminator: string,
  global_name: string
) => {
  if (!global_name) {
    return `${user_name}#${discriminator}`;
  } else {
    return `${global_name}(${user_name})`;
  }
};
const UserCard = ({
  data: {
    owner: { _id, discriminator, global_name, user_name },
  },
  name,
}: IProps) => {
  return (
    <Container href={`/board/${_id}`}>
      <span>{name}</span>
      <span>{makeName(user_name, discriminator, global_name)}</span>
    </Container>
  );
};
export default UserCard;

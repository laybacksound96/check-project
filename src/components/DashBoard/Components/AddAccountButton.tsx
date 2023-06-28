import styled from "styled-components";
import useModal from "../../../CustomHooks/Modal/useModal";

const Button = styled.button`
  height: 100px;
  border: none;
  background-color: ${(props) => props.theme.Color_4};
  color: ${(props) => props.theme.TextColor_A};
  border-radius: 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.231);
    transition: ease-in-out 0.1s;
  }
`;
const AddAccountButton = () => {
  const [openModal] = useModal();
  return (
    <Button onClick={() => openModal("ADD_ACCOUNT")}>+ add new account?</Button>
  );
};
export default AddAccountButton;
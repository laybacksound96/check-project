import styled from "styled-components";
import useModal from "../../../CustomHooks/Modal/useModal";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../../atoms/login";

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
  const loggined = useRecoilValue(LoginState);
  const [openModal] = useModal();
  return (
    <Button
      onClick={() => {
        if (!loggined) return;
        openModal("ADD_ACCOUNT");
      }}
    >
      계정 추가하기
    </Button>
  );
};
export default AddAccountButton;

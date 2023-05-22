import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalState } from "../../atoms";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: 100%;
  height: 100%;
`;
const SubjectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  h1 {
    font-size: 30px;
  }
  svg {
    margin-top: 5px;
    font-size: 25px;
  }
`;
const MainDiv = styled.div`
  width: 50%;
  min-width: 950px;
  height: auto;

  position: absolute;
  display: flex;
  flex-direction: column;

  padding: 40px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.subColor};
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 60%;
`;
const Modal = () => {
  const [ConfigModalOpen, SetConfigModalOpen] = useRecoilState(ModalState);
  const closeModalHandler = () => {
    SetConfigModalOpen((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.status = !prev.status;
      return copiedPrev;
    });
  };

  return ConfigModalOpen.status === true ? (
    <ModalContainer>
      <Background onClick={closeModalHandler}></Background>
      <MainDiv>
        <SubjectDiv>
          <h1>Setting</h1>
          <span onClick={closeModalHandler}>x</span>
        </SubjectDiv>

        <span>
          <hr />
          {ConfigModalOpen.content.name}
        </span>
      </MainDiv>
    </ModalContainer>
  ) : null;
};

export default Modal;

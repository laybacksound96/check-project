import React from "react";
import styled, { keyframes } from "styled-components";
const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  animation: ${fadeInAnimation} 0.2s ease-in-out;
  color: ${(props) => props.theme.bgColor};
  z-index: 999;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 80%;
`;
const MainDiv = styled.div`
  width: 50%;
  min-width: 950px;
  display: flex;
  flex-direction: column;
  z-index: 998;
  padding: 40px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.subColor};
  position: relative;
`;
const ButtonContainer = styled.div`
  position: absolute;
  margin-top: 10px;
  right: 40px;
`;
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  onOpen: boolean;
}

const Modal = ({ children, onClose, onOpen }: ModalProps) => {
  if (!onOpen) return null;
  return (
    <ModalContainer>
      <Background onClick={onClose}></Background>
      <MainDiv>
        <ButtonContainer>
          <button onClick={onClose} style={{ fontSize: "20px" }}>
            &times;
          </button>
        </ButtonContainer>
        {children}
      </MainDiv>
    </ModalContainer>
  );
};

export default Modal;

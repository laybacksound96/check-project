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
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  animation: ${fadeInAnimation} 0.2s ease-in-out;
  color: ${(props) => props.theme.TextColor_A};
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
  min-width: auto;
  display: flex;
  flex-direction: column;
  z-index: 998;
  padding: 40px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.Color_1};
  position: relative;
`;
const ButtonContainer = styled.div`
  right: 60px;
  button {
    width: 40px;
    height: 40px;
    border: 0;
    background-color: transparent;
    border-radius: 5px;
    &:hover {
      background-color: #ffffff72;
      transition: 0.2s ease-in-out;
    }
    span {
      color: ${(props) => props.theme.TextColor_A};
      font-size: 30px;
    }
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  h1 {
    font-size: 40px;
    font-weight: bolder;
  }
  span {
    font-size: 40px;
  }
`;
interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalContainer = ({ children, onClose, title }: ModalProps) => {
  return (
    <Container>
      <Background onClick={onClose}></Background>
      <MainDiv>
        <Header>
          <h1>{title}</h1>
          <ButtonContainer>
            <button onClick={onClose}>
              <span>X</span>
            </button>
          </ButtonContainer>
        </Header>
        {children}
      </MainDiv>
    </Container>
  );
};

export default ModalContainer;

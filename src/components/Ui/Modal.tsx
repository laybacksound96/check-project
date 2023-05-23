import React, { Component } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
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
  z-index: 999;
  padding: 40px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.subColor};
`;
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

class Modal extends Component<ModalProps> {
  render() {
    const { isOpen, onClose } = this.props;

    if (!isOpen) {
      return null;
    }
    return (
      <ModalContainer>
        <Background onClick={onClose}></Background>
        <MainDiv>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {this.props.children}
        </MainDiv>
      </ModalContainer>
    );
  }
}

export default Modal;

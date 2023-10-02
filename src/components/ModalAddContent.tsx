import { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes, css } from "styled-components";

interface IStyle {
  isDisabled: boolean;
}

const ButtonStyle = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.TextColor_A};
  &:hover {
    transition: 0.2s ease;
    background-color: #ffffff70;
  }
`;
const Error = styled.p`
  margin-left: 5px;
  margin-top: 5px;
  color: #bb002caa;
`;

const ModalAddContent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  return (
    <div></div>
    // <div>
    //   <Input
    //     isDisabled={false}
    //     value={inputValue}
    //     onChange={handleInputChange}
    //     placeholder="여기에 일정을 입력"
    //     ref={inputRef}
    //   />
    //   {isDupplicated && <Error>같은 이름의 일정이 이미 있어요</Error>}
    //   <div style={{ paddingTop: "10px" }}>
    //     <ButtonStyle
    //       id="contentId"
    //       disabled={isdisabled}
    //       onClick={AddContentHandler}
    //     >
    //       추가
    //     </ButtonStyle>
    //   </div>
    // </div>
  );
};

export default ModalAddContent;

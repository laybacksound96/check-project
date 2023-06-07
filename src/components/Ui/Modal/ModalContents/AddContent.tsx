import { useState, useRef, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { keyframes, css } from "styled-components";
import { ContentsState, ModalState, CheckBoxConfig } from "../../../../atoms";
import { Header } from "./ConfigContent";

interface IStyle {
  isDisabled: boolean;
}
const vibration = keyframes`
    from {
      transform: translateX(1%);
    }
    to {
      transform: translateX(-1%);
    }
  `;
export const Input = styled.input<IStyle>`
  width: 300px;
  height: 50px;
  background-color: ${(props) => props.theme.Color_4};
  border: 2px solid
    ${(props) => (props.isDisabled ? "#EF476F" : props.theme.TextColor_B)};
  border-radius: 10px;
  padding-left: 10px;
  color: ${(props) => props.theme.TextColor_A};
  &:hover {
    transition: 0.1s ease;
    border: 2px solid
      ${(props) => (props.isDisabled ? "#EF476F" : props.theme.Color_1)};
  }
  &:focus {
    outline: none;
    transition: 0.2s ease;
    border: 2px solid
      ${(props) => (props.isDisabled ? "#EF476F" : props.theme.TextColor_A)};
  }
  &::placeholder {
    color: ${(props) => props.theme.TextColor_B};
  }
  ${(props) =>
    props.isDisabled &&
    css`
      animation: ${vibration} 0.1s 5 linear;
    `};
`;

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

const AddContent = () => {
  const [inputValue, setInputValue] = useState("");
  const [isdisabled, setIsdisabled] = useState(true);
  const [isDupplicated, setIsDupplicated] = useState(false);

  const [contentState, setContentsState] = useRecoilState(ContentsState);
  const setModalState = useSetRecoilState(ModalState);
  const setCheckBoxConfig = useSetRecoilState(CheckBoxConfig);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  const addContentHandler = () => {
    if (Object.keys(contentState).find((elem) => elem === inputValue)) {
      setIsDupplicated(true);
      setIsdisabled(true);
      return;
    }
    setContentsState((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev[inputValue] = {
        type: "Custom",
        isVisible: true,
      };

      return { ...copiedPrev };
    });
    setCheckBoxConfig((prev) => {
      const copiedCheckBoxConfig = { ...prev };

      for (let CharacterName in copiedCheckBoxConfig) {
        const copiedContents = { ...copiedCheckBoxConfig[CharacterName] };
        copiedContents[`${inputValue}`] = {
          isCleared: false,
          isVisible: true,
          Gates: [],
        };
        copiedCheckBoxConfig[CharacterName] = copiedContents;
      }

      return copiedCheckBoxConfig;
    });

    setModalState((prev) => {
      const copiedPrev = { ...prev };
      copiedPrev.isModalOpen = false;
      return copiedPrev;
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDupplicated(false);
    event.target.value === "" ? setIsdisabled(true) : setIsdisabled(false);
    setInputValue(event.target.value);
  };
  return (
    <div>
      <Header>
        <h1>일정 설정</h1>
      </Header>
      <hr></hr>
      <Input
        isDisabled={false}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="여기에 일정을 입력"
        ref={inputRef}
      />
      {isDupplicated && <Error>같은 이름의 일정이 이미 있어요</Error>}
      <div style={{ paddingTop: "10px" }}>
        <ButtonStyle
          id="contentId"
          disabled={isdisabled}
          onClick={addContentHandler}
        >
          추가
        </ButtonStyle>
      </div>
    </div>
  );
};

export default AddContent;

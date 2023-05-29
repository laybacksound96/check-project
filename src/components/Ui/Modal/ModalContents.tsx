import { useRecoilState, useSetRecoilState } from "recoil";
import { CheckboxesState, ContentsState, ModalState } from "../../../atoms";

import Switch from "../UiComponents/Switch";

import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  span {
    font-size: 30px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ContentCard = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 20px;
  padding: 20px;
  margin-left: 20px;
  margin: 5px 0;
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  margin-right: 50px;
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  h1 {
    font-size: 40px;
    font-weight: bolder;
  }
`;
export const ConfigContent = () => {
  const [content, setContent] = useRecoilState(ContentsState);
  const DefaultContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Default"
  );

  const CustomContents = Object.keys(content).filter(
    (contentName) => content[contentName].type === "Custom"
  );

  function getValueHandler(isOn: boolean, contentName: string): void {
    setContent((prev) => {
      const copiedPrev = { ...prev };
      const CopiedTargetPrev = { ...copiedPrev[contentName] };
      CopiedTargetPrev.isVisible = isOn;
      copiedPrev[contentName] = CopiedTargetPrev;
      return copiedPrev;
    });
  }

  return (
    <div>
      <Header>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <h1>Settings</h1>
      </Header>
      <hr></hr>
      <Container>
        <ContentsContainer>
          <span>Basic</span>
          {DefaultContents.map((contentName) => (
            <ContentCard key={contentName}>
              {contentName}
              <Switch
                switchKey={contentName}
                switchState={content[contentName].isVisible}
                getValue={getValueHandler}
              />
            </ContentCard>
          ))}
        </ContentsContainer>

        <ContentsContainer>
          <span>Custom</span>
          {CustomContents.map((contentName) => (
            <ContentCard key={contentName}>
              {contentName}
              <Switch
                switchKey={contentName}
                switchState={content[contentName].isVisible}
                getValue={getValueHandler}
              />
            </ContentCard>
          ))}
        </ContentsContainer>
      </Container>
    </div>
  );
};

interface IStyle {
  isDupplicated: boolean;
}
const vibration = keyframes`
  from {
    transform: translateX(1%);
  }
  to {
    transform: translateX(-1%);
  }
`;
const Input = styled.input<IStyle>`
  width: 300px;
  height: 50px;
  background-color: ${(props) => props.theme.subColor};
  border: 2px solid ${(props) => (props.isDupplicated ? "#EF476F" : "#5e5e5e")};
  border-radius: 10px;
  padding-left: 10px;

  &:hover {
    transition: 0.1s ease;
    border: 2px solid
      ${(props) => (props.isDupplicated ? "#EF476F" : " #43434382")};
  }
  &:focus {
    outline: none;
    transition: 0.2s ease;
    border: 2px solid
      ${(props) => (props.isDupplicated ? "#EF476F" : props.theme.bgColor)};
  }
  &::placeholder {
    color: ${(props) => props.theme.bgColor};
  }
  ${(props) =>
    props.isDupplicated &&
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

export const AddContent = () => {
  const [inputValue, setInputValue] = useState("");
  const [isdisabled, setIsdisabled] = useState(true);
  const [isDupplicated, setIsDupplicated] = useState(false);

  const setModalState = useSetRecoilState(ModalState);
  const [contentState, setContentsState] = useRecoilState(ContentsState);
  const setCheckboxState = useSetRecoilState(CheckboxesState);

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
    setCheckboxState((prev) => {
      const copiedAccounts = { ...prev };

      for (let account in copiedAccounts) {
        const copiedAccount = { ...copiedAccounts[account] };

        for (let character in copiedAccounts[account]) {
          const copiedCotents = { ...copiedAccount[character] };
          copiedCotents[inputValue] = false;
          copiedAccount[character] = copiedCotents;
        }
        copiedAccounts[account] = copiedAccount;
      }

      return copiedAccounts;
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
        isDupplicated={isDupplicated}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="여기에 일정을 입력"
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

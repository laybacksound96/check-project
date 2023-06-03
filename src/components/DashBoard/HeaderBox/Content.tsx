import React from "react";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { IContents } from "./Contents";
const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.10);
  }
  100% {
    transform: scale(1);}
 `;

interface IpropStyle {
  shouldAnimate: boolean;
}
const ContentStyle = styled.li<IpropStyle>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
  text-align: center;
  border-radius: 10px;
  width: 170px;
  min-height: 200px;
  height: auto;

  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  ${(props) =>
    props.shouldAnimate &&
    css`
      animation: ${bump} 300ms ease-out;
    `};
`;
const ContentsBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-basis: 70%;
`;
const OwnerBox = styled.div`
  background-color: #ffffff;
  flex-basis: 30%;
  border-radius: 0 0 10px 10px;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  span {
    text-align: start;
    margin-right: 5px;
    font-size: 40px;
  }
`;
const Icon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  background-color: #d2d2d2;
`;
const TextContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 60%;
  h1 {
    font-size: 25px;
    margin-bottom: 5px;
  }
  p {
    margin-left: 5px;
    font-size: 15px;
  }
`;

interface IProps {
  contentState: IContents;
}

const Content = ({ contentState }: IProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [contentState.Frequency]);

  return (
    <ContentStyle shouldAnimate={shouldAnimate}>
      <ContentsBox>
        <HeaderContainer>
          <Icon />
          <span>{contentState.Frequency}</span>
        </HeaderContainer>
        <TextContainer>
          <h1>{contentState.ContentsName}</h1>
          {contentState.GateState.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </TextContainer>
      </ContentsBox>
      <OwnerBox></OwnerBox>
    </ContentStyle>
  );
};

export default React.memo(Content);

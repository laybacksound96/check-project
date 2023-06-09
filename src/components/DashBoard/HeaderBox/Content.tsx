import React from "react";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import getLowerLightnessColor from "../Functions/getLowerLightnessColor";
import { IFrequencyContents } from "../../../atoms/atoms";
interface IpropStyle {
  shouldAnimate: boolean;
  Color: string;
}

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

const ContentsBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-basis: 70%;
`;
interface IColorStyle {
  Color: string;
}

const OwnerBox = styled.div<IColorStyle>`
  background-color: ${(props) => getLowerLightnessColor(props.Color)};
  flex-basis: 30%;
  border-radius: 0 0 10px 10px;
`;

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

  * {
    color: ${(props) => props.theme.TextColor_A};
  }
  background-color: ${(props) => props.Color};
  ${(props) =>
    props.shouldAnimate &&
    css`
      animation: ${bump} 300ms ease-out;
    `};
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-basis: 50%;
  height: 40%;
  span {
    text-align: start;
    margin-right: 5px;
    font-size: 40px;
  }
`;

const Icon = styled.div<IColorStyle>`
  width: 45px;
  height: 45px;
  border-radius: 7px;
  background-color: ${(props) => getLowerLightnessColor(props.Color)};
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
  contentState: IFrequencyContents;
  Color: string;
}
const Content = ({ contentState, Color }: IProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    setShouldAnimate(true);

    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [contentState.Frequency]);
  return (
    <ContentStyle shouldAnimate={shouldAnimate} Color={Color}>
      <ContentsBox>
        <HeaderContainer>
          <Icon Color={Color} />
          <span>{contentState.Frequency}</span>
        </HeaderContainer>
        <TextContainer>
          <h1>{contentState.ContentsName}</h1>
          {contentState.GateState.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </TextContainer>
      </ContentsBox>
      <OwnerBox Color={Color} />
    </ContentStyle>
  );
};

export default React.memo(Content);

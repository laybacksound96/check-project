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

interface IColorStyle {
  Color: string;
}

const ContentStyle = styled.li<IpropStyle>`
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px 5px;
  border-radius: 10px;
  width: auto;
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: auto;

  h1 {
    font-weight: bold;
    font-size: 20px;
  }
`;

const Icon = styled.div<IColorStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 7px;
  background-color: ${(props) => getLowerLightnessColor(props.Color)};

  span {
    margin-bottom: 5px;
    font-size: 30px;
  }
`;
const OwnerBox = styled.div<IColorStyle>`
  display: grid;
  grid-template-columns: repeat(2, minmax(30px, auto));
  grid-auto-rows: auto;
  width: 100%;
  padding: 5px;
  height: auto;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) => getLowerLightnessColor(props.Color)};
`;
const OwnerCard = styled.span<IColorStyle>`
  width: auto;
  height: auto;
  margin: 0 5px;
  padding: 3px;
  font-size: 0.8rem;

  color: ${(props) => props.theme.Color_4};
  background-color: ${(props) => props.theme.TextColor_A};
  border-radius: 5px;
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          padding: "10px",
        }}
      >
        <HeaderContainer>
          <h1>{contentState.ContentsName}</h1>
          {contentState.GateState.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </HeaderContainer>

        <Icon Color={Color}>
          <span>{contentState.Frequency}</span>
        </Icon>
      </div>
      <OwnerBox Color={Color}>
        {contentState.ContentsOwner.map((name) => (
          <OwnerCard Color={Color}>{name}</OwnerCard>
        ))}
      </OwnerBox>
    </ContentStyle>
  );
};

export default React.memo(Content);

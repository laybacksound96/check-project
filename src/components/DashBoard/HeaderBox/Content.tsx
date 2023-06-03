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
  margin: 0 10px;
  text-align: center;
  border-radius: 10px;
  width: auto;
  max-width: 200px;
  min-width: 120px;
  height: 50px;
  line-height: 50px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  ${(props) =>
    props.shouldAnimate &&
    css`
      animation: ${bump} 300ms ease-out;
    `};
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
  }, [contentState]);

  return (
    <ContentStyle shouldAnimate={shouldAnimate}>
      {contentState.ContentsName}
      {contentState.GateState.map((elem) => {
        return <div key={elem}>{elem}</div>;
      })}
      {contentState.Frequency}
    </ContentStyle>
  );
};

export default React.memo(Content);

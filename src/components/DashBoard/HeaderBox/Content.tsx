import React from "react";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import getLowerLightnessColor from "../Functions/getLowerLightnessColor";
import { IFrequencyContents } from "../../../atoms/frequency";
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
const NameBox = styled.div`
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

const FrequencyBox = styled.div<IColorStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 7px;
  background-color: ${(props) => getLowerLightnessColor(props.Color, 20)};

  span {
    margin-bottom: 5px;
    font-size: 30px;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const OwnerContainer = styled.div<IColorStyle>`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-rows: auto;
  width: 100%;
  padding: 5px;
  height: auto;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) => getLowerLightnessColor(props.Color, 15)};
`;
const OwnerBox = styled.span<IColorStyle>`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 2px;
  padding: 3px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.TextColor_A};
  background-color: ${(props) => getLowerLightnessColor(props.Color, 20)};
  border-radius: 5px;
`;
interface IProps {
  contentState: IFrequencyContents;
  Color: string;
}
const Content = ({
  contentState: { Frequency, ContentName, GateState, RemainOwner },
  Color,
}: IProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
    const timeoutId = setTimeout(() => {
      setShouldAnimate(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [Frequency]);

  return (
    <ContentStyle shouldAnimate={shouldAnimate} Color={Color}>
      <HeaderContainer>
        <NameBox>
          <h1>
            {ContentName.length >= 12
              ? `${ContentName.slice(0, 12)}...`
              : ContentName}
          </h1>
          {GateState.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </NameBox>
        <FrequencyBox Color={Color}>
          <span>{Frequency}</span>
        </FrequencyBox>
      </HeaderContainer>
      <OwnerContainer Color={Color}>
        {RemainOwner.map((name, index) => {
          return index < 4 ? (
            <OwnerBox key={index} Color={Color}>
              {index === 3 && RemainOwner.length > 4 ? `${name}...` : name}
            </OwnerBox>
          ) : null;
        })}
      </OwnerContainer>
    </ContentStyle>
  );
};

export default React.memo(Content);

import styled, { css, keyframes } from "styled-components";
export const vibration = keyframes`
    from {
      transform: translateX(1%);
    }
    to {
      transform: translateX(-1%);
    }
  `;

interface IStyled {
  isDisabled: boolean;
}
export const Input = styled.input<IStyled>`
  width: 300px;
  height: 50px;
  color: ${(props) => props.theme.TextColor_A};
  background-color: ${(props) => props.theme.Color_4};
  border: 2px solid ${(props) => props.theme.TextColor_B};
  border-radius: 10px;
  padding-left: 10px;
  &:hover {
    transition: 0.1s ease;
    border: 2px solid
      ${({ theme, isDisabled }) =>
        isDisabled ? theme.Negative : theme.TextColor_B};
  }
  &:focus {
    outline: none;
    transition: 0.2s ease;
    ${({ theme, isDisabled }) =>
      isDisabled ? theme.Negative : theme.TextColor_B};
  }
  ${(props) =>
    props.isDisabled &&
    css`
      animation: ${vibration} 0.1s 5 linear;
    `};
  &::placeholder {
    color: ${(props) => props.theme.TextColor_B};
  }
`;
export const Button = styled.button`
  margin-top: 5px;
  border-radius: 5px;
  color: ${(props) => props.theme.TextColor_A};
  background-color: ${(props) => props.theme.Color_4};
  border: 2px solid ${(props) => props.theme.TextColor_B};
  &:disabled {
    color: ${(props) => props.theme.Negative};
    border: 2px solid ${(props) => props.theme.Negative};
    &:hover {
      border: 2px solid ${(props) => props.theme.Negative};
    }
  }
  &:hover {
    transition: 0.1s ease;
    border: 2px solid ${(props) => props.theme.TextColor_A};
  }
`;

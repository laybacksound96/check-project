import { useState } from "react";
import styled from "styled-components";

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;
interface IStyleProps {
  isOn: boolean;
}
const Lable = styled.label<IStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;
  background: ${(props) => (props.isOn ? "#06D6A0" : "#EF476F")};
`;
const SwitchButton = styled.span<IStyleProps>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 45%;
  height: 90%;
  border-radius: 45px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${(props) =>
    props.isOn &&
    `
    left: calc(100% - 2px);
    transform: translateX(-100%);
    `}
`;

interface ISwitchProps {
  switchState: boolean;
  getValue: (isOn: boolean, key: string) => void;
  switchKey: string;
}
const Switch = ({ switchState, getValue, switchKey }: ISwitchProps) => {
  const [isOn, setValue] = useState(switchState);
  const ToggleHanddler = () => {
    setValue((prev) => {
      getValue(!prev, switchKey);
      return !prev;
    });
  };
  return (
    <div style={{ display: "inline-flex" }}>
      <Checkbox id="ContentsSwitch" type="checkbox" />
      <Lable onClick={ToggleHanddler} htmlFor="ContentsSwitch" isOn={isOn}>
        <SwitchButton isOn={isOn} />
      </Lable>
    </div>
  );
};

export default Switch;

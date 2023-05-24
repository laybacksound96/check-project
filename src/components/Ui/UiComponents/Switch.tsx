import { useState } from "react";
import styled from "styled-components";
interface IStyleProps {
  isOn: boolean;
}

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;
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
const Switch = () => {
  const [isOn, setValue] = useState(false);
  const ToggleHanddler = () => {
    setValue((prev) => {
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

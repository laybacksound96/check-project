import "./Switch.css";
import styled from "styled-components";
interface IStyleProps {
  isOn: boolean;
}
interface IProps {
  isOn: boolean;
  handleToggle: () => void;
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
  width: 80px;
  height: 40px;
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
const Switch = ({ isOn, handleToggle }: IProps) => {
  return (
    <div>
      <Checkbox
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <Lable
        onClick={handleToggle}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        isOn={isOn}
      >
        <SwitchButton className={`react-switch-button`} isOn={isOn} />
      </Lable>
    </div>
  );
};

export default Switch;

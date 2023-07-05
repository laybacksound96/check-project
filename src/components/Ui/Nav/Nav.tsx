import styled from "styled-components";

const NavConainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.Color_4};
`;

const Nav = () => {
  return (
    <NavConainer>
      <span>CheckSheet.Link</span>
      <span>각종 버튼들</span>
      <span>Login</span>
    </NavConainer>
  );
};

export default Nav;

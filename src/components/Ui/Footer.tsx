import styled from "styled-components";

const FooterStyle = styled.footer`
  background-color: ${(props) => props.theme.Color_4};
  color: ${(props) => props.theme.TextColor_A};
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  svg {
    width: 30%;
    height: 30%;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <p>Contact me</p>
      <p>Discord: 412(_412)</p>
    </FooterStyle>
  );
};
export default Footer;

import styled from "styled-components";

const FooterStyle = styled.footer`
  background-color: #181924;
  color: ${(props) => props.theme.accentColor};
  width: inherit;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterStyle>
      <p>Contact us : 412#4615</p>
    </FooterStyle>
  );
};
export default Footer;

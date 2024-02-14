import styled from "styled-components";

const FooterContainer = styled.footer`
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 15px;
  background: #cbccce;
`;

const Logo = styled.img`
  width: 10%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo src="src\components\Imagens\LAB 365.png" alt="Logo LAB360" />
    </FooterContainer>
  );
};

export default Footer;

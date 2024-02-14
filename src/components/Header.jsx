import styled from "styled-components";

const HeaderContainer = styled.header`
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  margin: 0;
  padding: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="src\components\Imagens\035cook_113744.png" alt="Logo LAB360" />
      <h1>Livro de Receitas Online</h1>
    </HeaderContainer>
  );
};

export default Header;

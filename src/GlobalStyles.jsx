import { createGlobalStyle } from "styled-components";
import fonts from "google-fonts";

fonts.add({
  Ubuntu: ["400", "400bold"],
});

const GlobalStyles = createGlobalStyle`
   
  body {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;
    background-image: url('src/components/Imagens/Bg-LabReceitas.jpg'); 
    background-size: cover;
    background-position: center;
    color: #151515;
  }
`;

export default GlobalStyles;

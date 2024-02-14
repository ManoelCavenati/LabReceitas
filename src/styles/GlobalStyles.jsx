import { createGlobalStyle } from "styled-components";
import fonts from "google-fonts";

fonts.add({
  Ubuntu: ["400", "400bold"],
});

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;

    border: none;
    outline: none;
  }

  body {
    background-color: lightgray;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center; 
    align-items: center;
    
  }
 
`;

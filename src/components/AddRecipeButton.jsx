import { useState } from "react";
import styled from "styled-components";
import AddRecipePopup from "./AddRecipePopup";

const AddRecipeButtonContainer = styled.div`
  width: 260px;
  height: 300x;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  height: 50px;
  display: flex;
  align-items: flex-end;
`;

const AddRecipeButtonImg = styled.img`
  height: 100%;
`;

const AddRecipeButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <AddRecipeButtonContainer onClick={togglePopup}>
        <AddRecipeButtonImg
          src="src\components\Imagens\Icon-Add-Receita.png"
          alt="Adicionar Receita"
        />
      </AddRecipeButtonContainer>
      {isPopupOpen && <AddRecipePopup onClose={togglePopup} />}
    </>
  );
};

export default AddRecipeButton;

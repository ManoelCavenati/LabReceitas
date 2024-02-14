import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import icon from "../components/Imagens/035cook_113744.png";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;

const PopupContainer = styled.div`
  width: 450px;
  height: 430px;
  border-radius: 20px;
  background-color: #f7d437;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  background-color: #151515;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #f7d437;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 120px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const Input = styled.input`
  flex: 1;
  max-width: calc(100% - 130px);
  padding: 10px;
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  flex: 1;
  max-width: calc(100% - 130px);
  padding: 10px;
  height: 70px;
  border-radius: 10px;
`;

const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 0px;
  margin-left: 60px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #151515;
  border-radius: 10%;
  &:checked {
    background-color: #151515;
  }
`;

const CheckboxLabel = styled.label`
  margin-right: 5px;
  font-weight: bold;
`;

const InsertButton = styled.button`
  width: 40%;
  padding: 10px;
  background-color: #ffffff;
  border: 2px solid #151515;
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
  margin-bottom: 30px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  margin: 20px auto 0;
  display: block;
`;

const RestricoesTitle = styled.h2`
  font-size: 20px;
`;

const AddRecipePopup = ({ onClose }) => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [lactose, setLactose] = useState(false);
  const [gluten, setGluten] = useState(false);

  const recipeNameInputRef = useRef(null);

  useEffect(() => {
    recipeNameInputRef.current.focus();
  }, []);

  const handleInsertRecipe = () => {
    if (!recipeName || !ingredients || !instructions || (!lactose && !gluten)) {
      alert("Por favor, preencha todos os campos e selecione uma restrição.");
      return;
    }

    const newRecipe = {
      id: Math.random().toString(36).substring(7),
      name: recipeName,
      ingredients,
      instructions,
      lactose,
      gluten,
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = [...storedRecipes, newRecipe];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    onClose();

    location.reload();
  };

  return (
    <>
      <Overlay />
      <PopupContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>Adicionar Receita</Title>
        <Row>
          <Label htmlFor="recipeName">Nome:</Label>
          <Input
            ref={recipeNameInputRef}
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </Row>
        <Row>
          <Label htmlFor="ingredients">Ingredientes:</Label>
          <TextArea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Row>
        <Row>
          <Label htmlFor="instructions">Modo de Preparo:</Label>
          <TextArea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Row>
        <Row>
          <RestricoesTitle>Restrições:</RestricoesTitle>
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id="lactose"
              checked={lactose}
              onChange={(e) => {
                setLactose(e.target.checked);
                if (e.target.checked) setGluten(false);
              }}
            />
            <CheckboxLabel htmlFor="lactose">Lactose</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id="gluten"
              checked={gluten}
              onChange={(e) => {
                setGluten(e.target.checked);
                if (e.target.checked) setLactose(false);
              }}
            />
            <CheckboxLabel htmlFor="gluten">Glúten</CheckboxLabel>
          </CheckboxContainer>
        </Row>
        <InsertButton onClick={handleInsertRecipe}>Inserir</InsertButton>
        <Icon src={icon} alt="Ícone" />
      </PopupContainer>
    </>
  );
};

AddRecipePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddRecipePopup;

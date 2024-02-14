import { useState, useEffect, useRef } from "react";
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
  height: 470px;
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
  border: solid;
  border-color: #151515;
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
`;

const TextArea = styled.textarea`
  flex: 1;
  max-width: calc(100% - 130px);
  padding: 10px;
  height: 70px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 33px;
  gap: 40px;
`;

const ActionButton = styled.button`
  width: 40%;
  padding: 10px;
  background-color: #ffffff;
  border: 2px solid #151515;
  border-radius: 10px;
  align-self: center;
  cursor: pointer;
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

const EditRecipePopup = ({ onClose, recipeId, onDelete }) => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    lactose: false,
    gluten: false,
  });

  const nameInputRef = useRef(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const foundRecipe = storedRecipes.find((recipe) => recipe.id === recipeId);
    if (foundRecipe) {
      setRecipeData(foundRecipe);
    }

    nameInputRef.current.focus();
  }, [recipeId]);

  const handleUpdateRecipe = () => {
    if (
      !recipeData.name ||
      !recipeData.ingredients ||
      !recipeData.instructions
    ) {
      alert(
        "Por favor, preencha todos os campos obrigatórios para poder alterar a receita."
      );
      return;
    }

    if (!recipeData.lactose && !recipeData.gluten) {
      alert(
        "Por favor, selecione pelo menos uma restrição (lactose ou glúten) para poder alterar a receita."
      );
      return;
    }

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = storedRecipes.map((recipe) =>
      recipe.id === recipeId ? recipeData : recipe
    );
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    onClose();
    // Recarrega a página para refletir as alterações
    location.reload();
  };

  const handleDeleteRecipe = () => {
    onDelete(recipeId);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "lactose") {
      setRecipeData((prevState) => ({
        ...prevState,
        lactose: checked,
        gluten: !checked,
      }));
    } else if (name === "gluten") {
      setRecipeData((prevState) => ({
        ...prevState,
        gluten: checked,
        lactose: !checked,
      }));
    } else {
      setRecipeData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Overlay />
      <PopupContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>Editar Receita</Title>
        <Row>
          <Label htmlFor="name">Nome:</Label>
          <Input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={recipeData.name}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label htmlFor="ingredients">Ingredientes:</Label>
          <TextArea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <Label htmlFor="instructions">Modo de Preparo:</Label>
          <TextArea
            id="instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <RestricoesTitle>Restrições:</RestricoesTitle>
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id="lactose"
              name="lactose"
              checked={recipeData.lactose}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="lactose">Lactose</CheckboxLabel>
          </CheckboxContainer>
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id="gluten"
              name="gluten"
              checked={recipeData.gluten}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="gluten">Glúten</CheckboxLabel>
          </CheckboxContainer>
        </Row>
        <ButtonContainer>
          <ActionButton onClick={handleUpdateRecipe}>Alterar</ActionButton>
          <ActionButton onClick={handleDeleteRecipe}>Excluir</ActionButton>
        </ButtonContainer>
        <Icon src={icon} alt="Ícone" />
      </PopupContainer>
    </>
  );
};

EditRecipePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  recipeId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EditRecipePopup;

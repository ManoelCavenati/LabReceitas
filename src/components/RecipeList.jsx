import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import EditRecipePopup from "./EditRecipePopup";
import styled from "styled-components";
import { MdInfoOutline } from "react-icons/md";

import iconRecipe from "../../src/components/Imagens/Icon-Receita.png";

const CardContainer = styled.div`
  width: 340px;
  height: 330px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7d437;
  border-radius: 15px;
  box-shadow: inset 0 0 0 10px #151515;
`;

const Title = styled.h2`
  text-align: center;
`;

const ListContainer = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  max-height: 400px;
  display: space-between;
  flex-direction: column;
  gap: 15px;
  scrollbar-width: thin;
  scrollbar-color: transparent rgba(0, 0, 0, 0.1);
  padding-right: 15px;
  flex: 1;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RecipeImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const RecipeName = styled.div`
  flex: 1;
  margin-right: 10px;
  font-size: 20px;
`;

const InfoButton = styled.button`
  background-color: #151515;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const InfoIcon = styled(MdInfoOutline)`
  color: #f7d437;
  font-size: 28px;
`;

const RecipeList = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleEditRecipe = (recipeId) => {
    setShowEditPopup(true);
    setSelectedRecipeId(recipeId);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setSelectedRecipeId(null);
  };

  const handleDeleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
  };

  return (
    <CardContainer>
      <Title>Receitas cadastradas</Title>
      <ListContainer>
        {recipes.length === 0 ? (
          <p>
            Nenhuma Receita Cadastrada! Clique em (+) para Adicionar Receita.
          </p>
        ) : (
          recipes
            .filter((recipe) => {
              if (filter === "semLeite") return !recipe.lactose;
              if (filter === "semGluten") return !recipe.gluten;
              return true;
            })
            .map((recipe, index) => (
              <ListItem key={index}>
                <RecipeImage src={iconRecipe} alt="Ícone Receita" />
                <RecipeName>{recipe.name}</RecipeName>
                <InfoButton onClick={() => handleEditRecipe(recipe.id)}>
                  <InfoIcon />
                </InfoButton>
              </ListItem>
            ))
        )}
      </ListContainer>
      {showEditPopup && (
        <EditRecipePopup
          onClose={handleCloseEditPopup}
          recipeId={selectedRecipeId}
          onDelete={handleDeleteRecipe}
        />
      )}
    </CardContainer>
  );
};

RecipeList.propTypes = {
  filter: PropTypes.oneOf(["semLeite", "semGluten", "todas"]).isRequired,
};

export default RecipeList;

import styled from "styled-components";
import PropTypes from "prop-types";

const CardContainer = styled.div`
  display: flex;
  align-items: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background: #f7d437;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const RecipeIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const RecipeName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const RecipeInfoButton = styled.button`
  background-color: #506efa;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CardBox = ({ recipe }) => {
  return (
    <CardContainer>
      <Title>Receitas Cadastradas</Title>
      <RecipeIcon src={recipe.icon} alt="Ícone Receita" />
      <div>
        <RecipeName>{recipe.name}</RecipeName>
      </div>
      <RecipeInfoButton>Informações</RecipeInfoButton>
    </CardContainer>
  );
};

CardBox.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardBox;

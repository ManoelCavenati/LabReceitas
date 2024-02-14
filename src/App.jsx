import styled from "styled-components";
import { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import RecipeList from "./components/RecipeList";
import AddRecipeButton from "./components/AddRecipeButton";
import Footer from "./components/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 230px;
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  gap: 40px;
`;

const App = () => {
  const [filter, setFilter] = useState("todas");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <ContentContainer>
        <FilterSection onFilterChange={handleFilterChange} />
        <RecipeList filter={filter} />
        <AddRecipeButton />
      </ContentContainer>
      <Footer />
    </AppContainer>
  );
};

export default App;

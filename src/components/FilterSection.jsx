import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const FilterSectionContainer = styled.div`
  width: 240px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;
`;

const FilterLabel = styled.label`
  margin-bottom: 10px;
  color: #151515;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const FilterCheckbox = styled.input`
  margin-right: 10px;
  border-radius: 100%;
  background-color: #f7d437;
  padding: 8px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #151515;
  width: 18px;
  height: 18px;
  cursor: pointer;

  &:checked {
    background-color: #151515;
  }
`;

const FilterButton = styled.button`
  width: 60%;
  margin-top: 40px;
  padding: 15px;
  background-color: #f7d437;
  border: none;
  color: #151515;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: inset 0 0 0 4px #151515;
`;

const FilterSection = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleCheckboxChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleFilterClick = () => {
    onFilterChange(selectedFilter);
  };

  return (
    <FilterSectionContainer>
      <h2 style={{ color: "#151515", marginBottom: "40px" }}>Filtrar:</h2>{" "}
      <FilterLabel labelColor="#333" labelWeight="bold">
        <FilterCheckbox
          type="checkbox"
          checked={selectedFilter === "semLeite"}
          onChange={() => handleCheckboxChange("semLeite")}
          checkboxBgColor="#fff"
          checkboxPadding="8px"
        />
        Sem derivados de leite
      </FilterLabel>
      <FilterLabel labelColor="#555" labelWeight="normal">
        <FilterCheckbox
          type="checkbox"
          checked={selectedFilter === "semGluten"}
          onChange={() => handleCheckboxChange("semGluten")}
          checkboxBgColor="#fff"
          checkboxPadding="8px"
        />
        Sem glúten
      </FilterLabel>
      <FilterLabel labelColor="#777" labelWeight="normal">
        <FilterCheckbox
          type="checkbox"
          checked={selectedFilter === "todas"}
          onChange={() => handleCheckboxChange("todas")}
          checkboxBgColor="#fff"
          checkboxPadding="8px"
        />
        Todas
      </FilterLabel>
      <FilterButton
        buttonBgColor="#F7D437"
        buttonFontSize="18px"
        buttonPadding="12px"
        onClick={handleFilterClick}
      >
        Filtrar
      </FilterButton>
    </FilterSectionContainer>
  );
};

FilterSection.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterSection;

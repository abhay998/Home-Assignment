import React from "react";
import styled from "styled-components";
import FilterSelect from "./FilterSelect";
import ClearButton from "./ClearButton";
import LoadingButton from "./LoadingButton";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onRunReport: () => void;
  loading: boolean;
}

const SidebarContainer = styled.div`
  width: 20%;
  padding-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 20px;
  }
`;

const FilterWrapper = styled.div`
  border: 1px solid black;
  padding: 20px;
  height: 90%; /* Ensure Sidebar takes full height */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space evenly between children */

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onRunReport,
  loading,
}) => (
  <SidebarContainer>
    <FilterWrapper>
      <div>
        <h1>Filters</h1>
        <ClearButton onClick={() => onCategoryChange("")} />
        <FilterSelect
          label="Select Category"
          value={selectedCategory}
          options={categories}
          onChange={(event) => onCategoryChange(event.target.value)}
        />
      </div>
      <LoadingButton
        onClick={onRunReport}
        disabled={!selectedCategory || loading}
        loading={loading}
      />
    </FilterWrapper>
  </SidebarContainer>
);

export default Sidebar;

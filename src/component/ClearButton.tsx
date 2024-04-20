import React from "react";
import styled from "styled-components";

const StyledClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => (
  <StyledClearButton onClick={onClick}>Clear</StyledClearButton>
);

export default ClearButton;

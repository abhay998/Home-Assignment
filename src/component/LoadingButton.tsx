import React from "react";
import { CircularProgress, Button } from "@mui/material";
import styled from "styled-components";

interface LoadingButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 50px;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  disabled,
  loading,
}) => (
  <StyledButton
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={!disabled}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : "Run Report"}
  </StyledButton>
);

export default LoadingButton;

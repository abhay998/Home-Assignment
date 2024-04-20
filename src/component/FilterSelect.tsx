import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-top: 20px;
`;

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <StyledFormControl>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      input={<OutlinedInput label={label} />}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </StyledFormControl>
);

export default FilterSelect;

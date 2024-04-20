import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Sidebar = styled.div`
  width: 20%;
  padding-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 20px;
  }
`;

export const FilterWrapper = styled.div`
  border: 1px solid black;
  padding: 20px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

export const Button = styled.button<{ enabled: boolean }>`
  background-color: ${({ enabled }) => (enabled ? "#316bf4" : "grey")};
  width: 100%;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: ${({ enabled }) => (enabled ? "pointer" : "not-allowed")};
  border: none;
  outline: none;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

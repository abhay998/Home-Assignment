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
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  align-self: center;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 20px;
    height: auto;
  }
`;

export const FilterWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  justify-content: center;
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

export const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

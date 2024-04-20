import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CircularProgress, InputLabel } from "@mui/material";
import ChartComponent from "./component/ChartComponent";
import Highcharts, { Options } from "highcharts";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";

// Define TypeScript interfaces
interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductResponse {
  products: Product[];
  total: number;
}

interface AppProps {}

// Styled components with TypeScript typings
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Sidebar = styled.div`
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

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */

  @media (max-width: 768px) {
    padding: 20px; /* Optional: Add padding on smaller screens */
  }
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

const Button = styled.button<{ enabled: boolean }>`
  background-color: ${({ enabled }) => (enabled ? "#316bf4" : "grey")};
  width: 100%;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: ${({ enabled }) => (enabled ? "pointer" : "not-allowed")};
  border: none; /* Remove the border */
  outline: none; /* Remove default focus outline */
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

// React component
const App: React.FC<AppProps> = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductResponse | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedXAxisValues, setSelectedXAxisValues] = useState<string[]>([]);
  const [selectedYAxisValues, setSelectedYAxisValues] = useState<number[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    clearFilters();
    setSelectedCategory(event.target.value);
  };

  const handleProductChange = (event: SelectChangeEvent<string[]>) => {
    const values = event.target.value as string[];
    setSelectedProducts(values);
  };

  const clearFilters = () => {
    setProducts(undefined);
    setSelectedCategory("");
    setSelectedProducts([]);
    setSelectedXAxisValues([]);
    setSelectedYAxisValues([]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data: string[] = await categoryRes.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      try {
        const productRes = await fetch(
          `https://dummyjson.com/products/category/${selectedCategory}`
        );
        const data: ProductResponse = await productRes.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const runReport = () => {
    setLoader(true);
    let timer = setTimeout(() => {
      const selectedProductTitles =
        products?.products.map((product) => product.title) || [];
      const filteredTitles = selectedProductTitles.filter((title) =>
        selectedProducts.includes(title)
      );
      setSelectedXAxisValues(
        filteredTitles.length ? filteredTitles : selectedProductTitles
      );

      const filteredPrices =
        products?.products
          .filter((product) => selectedProducts.includes(product.title))
          .map((product) => product.price)
          .filter((price) => typeof price === "number") || [];

      setSelectedYAxisValues(
        filteredPrices.length
          ? filteredPrices
          : products?.products.map((product) => product.price) || []
      );
      setLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text: selectedCategory.length
        ? `Products in selected ${selectedCategory}`
        : "",
      align: "left",
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    xAxis: {
      categories: selectedXAxisValues.length ? selectedXAxisValues : categories,
      visible: true,
    },
    yAxis: {
      title: {
        text: selectedCategory,
      },
      visible: !!selectedXAxisValues.length,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: selectedXAxisValues.length ? "₹{point.y:.2f}" : "",
        },
      },
    },
    series: [
      {
        type: "column",
        name: "",
        data: selectedYAxisValues.length
          ? selectedYAxisValues
          : [6, 8, 5, 7, 3],
      },
    ],
  };

  return (
    <AppContainer>
      <FiltersContainer>
        <Sidebar>
          <FilterWrapper>
            <div>
              <TitleBar>
                <h1>Filters</h1>
                <ClearButton onClick={clearFilters}>Clear</ClearButton>
              </TitleBar>
              <FormControl fullWidth>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Select Category" />}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ marginTop: "20px" }}>
                <InputLabel id="product-label">Select Product</InputLabel>
                <Select
                  labelId="product-label"
                  multiple
                  value={selectedProducts}
                  onChange={handleProductChange}
                  input={<OutlinedInput label="Select Product" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {products?.products.map((product) => (
                    <MenuItem key={product.id} value={product.title}>
                      <Checkbox
                        checked={selectedProducts.includes(product.title)}
                      />
                      <ListItemText primary={product.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <ButtonContainer>
              <Button
                enabled={!!products?.products.length}
                onClick={runReport}
                disabled={!products?.products.length}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Run Report"
                )}
              </Button>
            </ButtonContainer>
          </FilterWrapper>
        </Sidebar>
        <Content>
          <ChartContainer>
            <ChartComponent chartOptions={chartOptions} />
          </ChartContainer>
        </Content>
      </FiltersContainer>
    </AppContainer>
  );
};

export default App;

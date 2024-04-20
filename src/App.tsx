import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ChartComponent from "./component/ChartComponent";
import { ProductResponse } from "./interfaces/ProductResponse";
import { fetchProductsByCategory } from "./services/ProductService";
import {
  AppContainer,
  FiltersContainer,
  Sidebar,
  FilterWrapper,
  ButtonContainer,
  Content,
  TitleBar,
  ClearButton,
  Button,
  ChartContainer,
} from "./App.styles";
import { Checkbox, ListItemText } from "@mui/material";

interface AppProps {}

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
    setSelectedProducts(event.target.value as string[]);
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
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data: string[] = await response.json();
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
        const data = await fetchProductsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error", error);
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
                <h2>Filters</h2>
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

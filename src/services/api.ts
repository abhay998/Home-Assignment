import { ProductResponse } from "../interfaces";

export const fetchCategories = async (): Promise<string[]> => {
  const categoryRes = await fetch("https://dummyjson.com/products/categories");
  const data: string[] = await categoryRes.json();
  return data;
};

export const fetchProductsByCategory = async (
  category: string
): Promise<ProductResponse> => {
  const productRes = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data: ProductResponse = await productRes.json();
  return data;
};

import { ProductResponse } from "../interfaces/ProductResponse";

export async function fetchProductsByCategory(
  category: string
): Promise<ProductResponse> {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

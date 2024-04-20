export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
}

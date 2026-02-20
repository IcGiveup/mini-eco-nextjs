import { Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(
  limit: number,
  skip: number
): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(
  id: string
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=194`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}



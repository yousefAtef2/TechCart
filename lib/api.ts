import type { Product, ProductsResponse } from "@/types/product";

const API_BASE = "https://dummyjson.com";

/** Fetch all products from the DummyJSON REST API. */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=250`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ProductsResponse = await res.json();
  return data.products;
}

/** Fetch a single product by id. Throws if the product does not exist. */
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return (await res.json()) as Product;
}

/** Fetch the list of available product categories. */
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/products/category-list`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return (await res.json()) as string[];
}

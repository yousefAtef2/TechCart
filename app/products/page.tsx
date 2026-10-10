import type { Metadata } from "next";
import ProductsExplorer from "@/components/ProductsExplorer";

export const metadata: Metadata = {
  title: "Products — TechCart",
  description: "Browse all tech products and find what fits your setup.",
};

export default function ProductsPage() {
  return <ProductsExplorer />;
}

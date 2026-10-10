"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { humanizeCategory } from "@/lib/format";

export default function ProductsExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("https://dummyjson.com/products?limit=250"),
        fetch("https://dummyjson.com/products/category-list"),
      ]);
      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Request failed");
      }
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setProducts(productsData.products as Product[]);
      setCategories(categoriesData as string[]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesSearch =
        query === "" || product.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <>
      {/* Hero */}
      <section className="relative mt-8 overflow-hidden rounded-3xl border border-brand/10 bg-gradient-to-br from-brand-light via-white to-brand-light px-6 py-14 text-center sm:px-12 sm:py-20">
        {/* decorative glows (same palette) */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 text-xs font-semibold text-brand shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            TechCart · Product Explorer
          </span>
          <h1 className="mt-5 bg-gradient-to-r from-navy via-brand to-navy bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Find your next favorite tech.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Explore products and find what fits your setup.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-[72px] z-10 -mx-4 mt-8 bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg shadow-navy/5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-brand-light/50 py-2.5 pl-11 pr-4 text-sm text-navy outline-none transition placeholder:text-muted focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="w-full cursor-pointer rounded-xl border border-gray-200 bg-brand-light/50 px-4 py-2.5 text-sm font-medium text-navy outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 sm:w-60"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {humanizeCategory(cat)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Error state */}
      {error && !loading && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <p className="mt-4 font-semibold text-red-600">{error}</p>
          <p className="mt-1 text-sm text-muted">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={load}
            className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-gradient-to-br from-brand-light via-white to-brand-light px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="m8 11 3-3" />
              <path d="m11 8 3 3" />
            </svg>
          </div>
          <p className="mt-4 text-lg font-semibold text-navy">
            No products found.
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different search term or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-5 rounded-xl border border-brand/30 px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm font-medium text-muted">
              Showing{" "}
              <span className="font-semibold text-navy">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </p>
            {category !== "all" && (
              <button
                type="button"
                onClick={() => setCategory("all")}
                className="text-sm font-medium text-brand transition hover:underline"
              >
                Reset filter
              </button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

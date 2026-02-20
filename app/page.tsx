"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  const limit = 8;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    filtered = filtered.filter((p) => p.price <= maxPrice);

    setFilteredProducts(filtered);
    setPage(1); // reset page safely
  }, [selectedCategory, maxPrice, products]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Mini E-Commerce
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex flex-col">
          <label className="text-sm mb-1">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!loading && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

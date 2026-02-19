"use client";
import ProductSkeleton from "@/components/ProductSkeleton";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [loading, setLoading] = useState(false);
  const limit = 8;

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, maxPrice]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const skip = (page - 1) * limit;
      const data = await getProducts(limit, skip);

      setProducts(data.products);
      setTotal(data.total);

      setLoading(false);
    }

    fetchData();
  }, [page]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      );
    }

    filtered = filtered.filter((p) => p.price <= maxPrice);

    setFilteredProducts(filtered);
  }, [products, selectedCategory, maxPrice]);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Mini E-Commerce</h1>

      {/* FILTER SECTION */}
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        {/* Category */}
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

        {/* Price Range */}
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
          ? Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
          : filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}

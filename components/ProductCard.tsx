import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-xl hover:scale-105 transition duration-300">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />
        <h2 className="text-lg font-semibold mt-3">
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-blue-600 font-bold mt-2">
          ${product.price}
        </p>
      </Link>
    </div>
  );
}

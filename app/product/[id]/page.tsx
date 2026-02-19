import { getProductById } from "@/services/api";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetails({ params }: Props) {
  try {
    const { id } = await params;

    const product = await getProductById(id);

    return (
      <main className="min-h-screen p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded"
          />

          <div>
            <h1 className="text-3xl font-bold mb-4">
              {product.title}
            </h1>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <p className="text-xl font-semibold mb-2">
              Category: {product.category}
            </p>

            <p className="text-2xl text-blue-600 font-bold mb-2">
              ${product.price}
            </p>

            <p className="text-yellow-500">
              ⭐ Rating: {product.rating}
            </p>

            <p className="text-sm mt-2">
              Stock: {product.stock}
            </p>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
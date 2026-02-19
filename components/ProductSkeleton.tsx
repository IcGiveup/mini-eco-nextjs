export default function ProductSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="bg-gray-700 h-48 w-full rounded mb-4"></div>
      <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-700 h-4 w-full mb-2 rounded"></div>
      <div className="bg-gray-700 h-4 w-1/2 rounded"></div>
    </div>
  );
}
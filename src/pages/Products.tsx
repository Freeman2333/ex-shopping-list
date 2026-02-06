import { useState } from "react";
import { useGetProductsQuery } from "../redux/services/mainApi";
import ProductItem from "../components/ProductItem";
import ProductForm from "../components/ProductForm";
import Icon from "../components/ui/Icons.tsx";

const Products: React.FC = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Error: {JSON.stringify(error)}
        </div>
      </div>
    );
  }

  const total = products
    .filter((product) => !product.isCompleted)
    .reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="font-semibold text-2xl leading-none tracking-normal text-slate-600 text-center mb-4">
          Shopping List
        </h1>

        <div className="bg-white rounded-lg overflow-hidden">
          {products.map((product, index) => (
            <ProductItem
              key={product.id}
              product={product}
              index={index}
              onEdit={() => {
                setSelectedProductId(product.id);
                setIsBottomSheetOpen(true);
              }}
            />
          ))}

          <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
            <span className="text-xl text-slate-600">Total :</span>
            <span className="text-xl font-bold text-slate-600">
              {total} NIS
            </span>
          </div>
        </div>

        <button
          className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-orange-500 rounded-lg bg-transparent border-0 outline-none"
          onClick={() => {
            setSelectedProductId(null);
            setIsBottomSheetOpen(true);
          }}
        >
          <Icon.Plus className="w-5 h-5" />
          <span className="text-xl">Add Product</span>
        </button>
      </div>

      {isBottomSheetOpen && (
        <ProductForm
          isOpen={isBottomSheetOpen}
          onClose={() => {
            setIsBottomSheetOpen(false);
            setSelectedProductId(null);
          }}
          productId={selectedProductId}
        />
      )}
    </div>
  );
};

export default Products;

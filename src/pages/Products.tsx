import { useGetProductsQuery } from "../redux/services/mainApi";
import ProductItem from "../components/ProductItem";
import Icon from "../assets/icons.tsx";

const Products: React.FC = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

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

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="font-semibold text-2xl leading-none tracking-normal text-slate-600 text-center mb-4">
          Shopping List
        </h1>

        <div className="bg-white rounded-lg overflow-hidden">
          {products.map((product, index) => (
            <ProductItem key={product.id} product={product} index={index} />
          ))}

          <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
            <span className="text-xl text-slate-600">Total :</span>
            <span className="text-xl font-bold text-slate-600">
              {total} NIS
            </span>
          </div>
        </div>

        <button className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-orange-500 rounded-lg bg-transparent border-0 outline-none">
          <Icon.Plus className="w-5 h-5" />
          <span className="text-xl">Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default Products;

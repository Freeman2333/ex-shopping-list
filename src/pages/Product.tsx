import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../redux/services/mainApi";
import Icon from "../components/ui/Icons.tsx";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-lg mx-auto px-4">
        <button
          onClick={() => navigate("/products")}
          className="mb-6 p-2 text-gray-400 bg-transparent border-0 outline-none flex items-center"
        >
          <Icon.ArrowBack className="w-6 h-6" />
        </button>

        <h1 className="font-semibold text-2xl leading-none tracking-normal text-slate-600 text-center mb-6">
          {product.name}
        </h1>

        <div className="bg-white rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">
              Description
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg text-slate-600">Price:</span>
              <span className="text-xl font-bold text-orange-400">
                {product.price} NIS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

import React from "react";
import type { Product } from "../types/product";
import Icon from "../assets/icons.tsx";
import { Link } from "react-router-dom";
import { useToggleProductCompleteMutation } from "../redux/services/mainApi";

interface ProductItemProps {
  product: Product;
  index: number;
  onEdit?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  index,
  onEdit,
}) => {
  const [toggleComplete] = useToggleProductCompleteMutation();

  const handleDelete = () => {
    toggleComplete(product.id);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-200 bg-white ${product.isCompleted ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-orange-400">{index + 1}</span>
        <div>
          {product.isCompleted ? (
            <h3 className="text-md font-normal leading-none tracking-normal text-slate-600 mr-4 line-through cursor-default">
              {product.name}
            </h3>
          ) : (
            <Link to={`/product/${product.id}`} className="cursor-pointer">
              <h3 className="text-md font-normal leading-none tracking-normal text-slate-600 mr-4">
                {product.name}
              </h3>
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-md font-normal leading-none tracking-normal text-slate-600 ${product.isCompleted ? "line-through" : ""}`}
        >
          {product.price} NIS
        </span>
        <div className="flex gap-1">
          <button
            disabled={product.isCompleted}
            className="p-1 text-gray-400 bg-transparent border-0 outline-none"
            onClick={onEdit}
          >
            <Icon.Edit />
          </button>
          <button
            disabled={product.isCompleted}
            className="p-1 text-gray-400 bg-transparent border-0 outline-none"
            onClick={handleDelete}
          >
            <Icon.Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

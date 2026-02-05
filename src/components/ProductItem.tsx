import React, { useState } from "react";
import type { Product } from "../types/product";
import Icon from "../assets/icons.tsx";
import { Link } from "react-router-dom";

interface ProductItemProps {
  product: Product;
  index: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-gray-200 bg-white ${isDeleted ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-orange-400">{index + 1}</span>
        <div>
          {isDeleted ? (
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
          className={`text-md font-normal leading-none tracking-normal text-slate-600 ${isDeleted ? "line-through" : ""}`}
        >
          {product.price} NIS
        </span>
        <div className="flex gap-1">
          <button
            disabled={isDeleted}
            className="p-1 text-gray-400 bg-transparent border-0 outline-none"
          >
            <Icon.Edit />
          </button>
          <button
            disabled={isDeleted}
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

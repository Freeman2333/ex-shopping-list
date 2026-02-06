import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import BottomSheet from "./ui/BottomSheet";
import Input from "./ui/Input";
import Icon from "./ui/Icons.tsx";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} from "../redux/services/mainApi";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: number | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const { data: product } = useGetProductQuery(productId!, {
    skip: !productId,
  });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description || "");
    } else {
      reset();
    }
  }, [product, isOpen, setValue, reset]);

  const onSubmitForm = async (data: ProductFormData) => {
    try {
      if (productId) {
        await updateProduct({
          id: productId,
          ...data,
        }).unwrap();

        toast.success("Product updated successfully");
      } else {
        await createProduct(data).unwrap();
        toast.success("Product created successfully");
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                label="Name"
                value={field.value}
                onChange={field.onChange}
                placeholder="Product name"
                name="name"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                label="Price"
                value={field.value?.toString() || ""}
                onChange={(value) => field.onChange(parseFloat(value) || 0)}
                placeholder="0"
                type="number"
                name="price"
                errorMessage={errors.price?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                label="Description"
                value={field.value}
                onChange={field.onChange}
                placeholder="Product description"
                name="description"
                rows={4}
                errorMessage={errors.description?.message}
              />
            )}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating || isCreating}
              className={`px-6 py-2 rounded-md font-medium focus:outline-none transition-colors flex items-center justify-center ${
                isUpdating || isCreating
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-orange-500 hover:bg-orange-50"
              }`}
            >
              {isUpdating || isCreating ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon.Arrow />
              )}
            </button>
          </div>
        </form>
      </div>
    </BottomSheet>
  );
};

export default ProductForm;

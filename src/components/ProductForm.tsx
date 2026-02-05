import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BottomSheet from "./ui/BottomSheet";
import Input from "./ui/Input";
import Icon from "../assets/icons.tsx";
import { productSchema, type ProductFormData } from "../schemas/productSchema";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  const onSubmitForm = (data: ProductFormData) => {
    console.log({ data });

    // reset();
    // onClose();
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
              className="px-6 py-2 bg-white  text-orange-500 rounded-md font-medium hover:bg-orange-50 focus:outline-none transition-colors flex items-center justify-center"
            >
              <Icon.Arrow />
            </button>
          </div>
        </form>
      </div>
    </BottomSheet>
  );
};

export default ProductForm;

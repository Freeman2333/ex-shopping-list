import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a valid number"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
});

export type ProductFormData = yup.InferType<typeof productSchema>;

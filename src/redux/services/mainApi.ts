import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types/product";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3003"}`;

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  tagTypes: ["Products", "Product"] as const,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/items",
      transformResponse: (response: { items: Product[] }) => response.items,
      providesTags: (result) =>
        result
          ? [
              { type: "Products", id: "LIST" },
              ...result.map((p) => ({ type: "Product" as const, id: p.id })),
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/items/${id}`,
      transformResponse: (response: { item: Product }) => response.item,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      async onQueryStarted(
        { id, ...updatedProduct },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData("getProduct", id, (draft) => {
            Object.assign(draft, updatedProduct);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<
      Product,
      Omit<Product, "id" | "isCompleted">
    >({
      query: (newProduct) => ({
        url: `/items`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    toggleProductComplete: builder.mutation<void, number>({
      queryFn: () => ({ data: undefined }),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          mainApi.util.updateQueryData("getProducts", undefined, (draft) => {
            const product = draft.find((p) => p.id === productId);
            if (product) {
              product.isCompleted = !product.isCompleted;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useToggleProductCompleteMutation,
} = mainApi;

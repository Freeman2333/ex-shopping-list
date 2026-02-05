import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types/product";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3003"}/api`;

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/items`,
      transformResponse: (response: { items: Product[] }) => {
        return response.items;
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Products", id: "LIST" },
              ...result.map((product: Product) => ({
                type: "Product" as const,
                id: product.id,
              })),
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const { useGetProductsQuery } = mainApi;

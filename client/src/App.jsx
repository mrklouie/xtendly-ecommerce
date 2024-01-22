import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound, AddProduct, Store, Cart, Product } from "./components";
import { Homepage } from "./pages";
import axios from "axios";

//React Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Actions and Loaders
import { action as addProductAction } from "./components/addProduct";
import { loader as storeLoader } from "./components/store";
import { loader as productLoader } from "./components/product";

//Zustand Store Imports
import { useStore } from "./store";

export const customFetch = axios.create({
  baseURL: "/api/v1",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const {
    search,
    price_sort,
    category,
    isEdit,
    product_name,
    product_price,
    product_description,
    product_category,
    image,
    resetInputs,
    isLoading,
    _id,
    activateLoading,
    deactivateLoading,
  } = useStore((state) => ({
    activateLoading: state.activateLoading,
    deactivateLoading: state.deactivateLoading,
    search: state.search,
    price_sort: state.price_sort,
    category: state.category,
    isEdit: state.isEdit,
    _id: state._id,
    resetInputs: state.resetInputs,
    isLoading: state.isLoading,

    product_name: state.product_name,
    product_price: state.product_price,
    product_description: state.product_description,
    product_category: state.product_category,
    image: state.image,
  }));

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Homepage />,
      children: [
        {
          index: true,
          loader: storeLoader({ search, price_sort, category, queryClient }),
          element: <Store />,
        },
        {
          action: addProductAction({
            _id,
            isEdit,
            product_name,
            product_price,
            product_description,
            product_category,
            image,
            resetInputs,
            queryClient,
            isLoading,
            activateLoading,
            deactivateLoading,
          }),
          path: "/add-product",
          element: <AddProduct />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          loader: productLoader({ queryClient }),
          path: "/product/:productId",
          element: <Product />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

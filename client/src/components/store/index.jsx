import React, { useEffect } from "react";
import styles from "./store.module.scss";
import { ProductItem } from "..";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../../App";
import { useStore } from "../../store";

export const loader =
  ({ search, price_sort, category, queryClient }) =>
  async () => {
    try {
      await queryClient.ensureQueryData({
        queryKey: ["products", search, category, price_sort],
        queryFn: async () => {
          return await customFetch(
            `/products/?search=${search}&category=${category}&price_sort=${price_sort}`
          );
        },
      });
      return null;
    } catch (error) {
      return error;
    }
  };

function index() {
  const { search, price_sort, category, setProducts } = useStore((state) => ({
    search: state.search,
    price_sort: state.price_sort,
    category: state.category,
    setProducts: state.setProducts,
  }));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", search, category, price_sort],
    queryFn: async () => {
      return await customFetch(
        `/products/?search=${search}&category=${category}&price_sort=${price_sort}`
      );
    },
  });

  const serverProduct = data?.data?.data;

  const errorMessage = useLoaderData();

  useEffect(() => {
    if (serverProduct) {
      setProducts(serverProduct);
    }
  }, [serverProduct]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.response?.data?.message}</h2>;
  }

  return (
    <div className={styles["store-container"]}>
      <div className={styles["store-container__contents"]}>
        <div className={styles["products-container"]}>
          {serverProduct &&
            serverProduct.map((product, index) => {
              return <ProductItem key={index} {...product} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default index;

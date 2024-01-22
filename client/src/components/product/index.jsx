import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { customFetch } from "../../App";
import styles from "./product.module.scss";
import { useStore } from "../../store";

export const loader =
  ({ queryClient }) =>
  async ({ request, params }) => {
    const { productId } = params;
    try {
      await queryClient.ensureQueryData({
        queryKey: ["products", productId],
        queryFn: async () => await customFetch(`/products/${productId}`),
      });
      return null;
    } catch (error) {
      return error;
    }
  };

function Index() {
  const navigate = useNavigate();
  const { resetQuantity, addToCart } = useStore((state) => ({
    addToCart: state.addToCart,
    resetQuantity: state.resetQuantity,
  }));
  const { productId } = useParams();
  const { data, isError, error, isLoading, isSuccess } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => await customFetch(`/products/${productId}`),
  });

  const product = data?.data?.data?.product;

  if (isError) {
    console.log(error);
  }

  const handleAddToCart = () => {
    const { product_name, _id, product_price } = product;
    addToCart({ product_name, _id, product_price });
    navigate("/cart");
  };

  console.log(product);

  return (
    <div className={styles["product-container"]}>
      <div className={styles["product-contents"]}>
        <div className={styles["flex-container"]}>
          <div className={styles.left}>
            <div className={styles["image-wrapper"]}>
              <img src={product.image[0]?.secure_url} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.contents}>
              <div className={styles["text-contents"]}>
                <p className={styles.title}>{product?.product_name}</p>
                <span className={styles.category}>{product?.category}</span>
                <p className={styles.price}>₱{product?.product_price}</p>

                <p className={styles.description}>
                  {product?.product_description}
                </p>
              </div>

              <div className={styles["button-contents"]}>
                <button
                  onClick={() => {
                    handleAddToCart();
                    resetQuantity();
                  }}
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

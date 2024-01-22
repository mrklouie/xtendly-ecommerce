import React, { useState } from "react";
import styles from "./productItem.module.scss";
import { redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../../App";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store";
function Index({
  _id,
  category,
  image,
  product_description,
  product_name,
  product_price,
}) {
  const { setTempData, activateEdit } = useStore((state) => ({
    setTempData: state.setTempData,
    activateEdit: state.activateEdit,
  }));
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onDelete = async (input) => {
    try {
      const data = await customFetch.delete(`/products/${input}`);
      console.log(data);
      queryClient.invalidateQueries(["products"]);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    activateEdit();
    setTempData(
      _id,
      product_name,
      product_price,
      product_description,
      category,
      image
    );

    navigate("/add-product");
  };

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={styles["product-item-wrapper"]}
    >
      <div className={styles["product-image"]}>
        <img src={image[0].secure_url} />
        <div
          className={`${styles["hover-effect"]} ${
            isActive ? styles.active : ""
          }`}
        >
          <div className={styles["button-wrapper"]}>
            <button onClick={onEdit} type="button">
              Edit
            </button>
            <button onClick={() => navigate(`/product/${_id}`)} type="button">
              View
            </button>
            <button onClick={() => onDelete(_id)} type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className={styles["product-details"]}>
        <p className={styles.name}>{product_name}</p>
        <p className={styles.price}>₱{product_price}</p>
      </div>
    </div>
  );
}

export default Index;

import React, { useState } from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import styles from "./addProduct.module.scss";
import { customFetch } from "../../App";
import { useStore } from "../../store";

export const action =
  ({
    _id,
    resetInputs,
    queryClient,
    isLoading,
    activateLoading,
    deactivateLoading,
  }) =>
  async ({ request }) => {
    const formData = await request.formData();

    const category = formData.get("product_category");
    formData.append("category", category);
    const intent = formData.get("intent");

    console.log(intent);
    formData.delete("intent");

    switch (intent) {
      case "add":
        try {
          activateLoading();
          await customFetch.post("/products/create", formData);
          deactivateLoading();
          queryClient.invalidateQueries(["products"]);
          document.getElementById("add-form").reset();
          resetInputs();
          return redirect("/");
        } catch (error) {
          deactivateLoading();
          return error;
        }

      case "edit":
        try {
          activateLoading();
          formData.append("_id", _id);
          await customFetch.patch("/products/update", formData);
          deactivateLoading();
          queryClient.invalidateQueries(["products"]);
          document.getElementById("add-form").reset();
          resetInputs();
          return redirect("/");
        } catch (error) {
          deactivateLoading();
          return error;
        }

      default:
        throw new Error(`No such action: [${intent}]`);
    }
  };

function index() {
  const {
    isEdit,
    product_name,
    product_price,
    product_description,
    product_category,
    isLoading,
    handleChangeFormInput,
  } = useStore((state) => ({
    isEdit: state.isEdit,
    product_name: state.product_name,
    product_price: state.product_price,
    product_description: state.product_description,
    product_category: state.product_category,
    isLoading: state.isLoading,
    handleChangeFormInput: state.handleChangeFormInput,
  }));

  return (
    <div className={styles["add-product-container"]}>
      <small>{isEdit ? "PATCH" : "POST"}</small>
      <div className={styles["add-product-container__contents"]}>
        <Form
          id="add-form"
          method={isEdit ? "patch" : "post"}
          encType="multipart/form-data"
        >
          <input
            required={!isEdit}
            type="text"
            name="product_name"
            id="product_name"
            placeholder="Product Name"
            onChange={handleChangeFormInput}
            value={product_name}
          />
          <input
            required={!isEdit}
            type="number"
            name="product_price"
            id="product_price"
            placeholder="Price"
            onChange={handleChangeFormInput}
            value={product_price}
          />
          <select
            required={!isEdit}
            value={product_category}
            name="product_category"
            id="product_category"
            onChange={handleChangeFormInput}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="foods">Foods</option>
            <option value="drinks">Drinks</option>
          </select>
          <input
            required={!isEdit}
            type="file"
            name="product_image"
            id="product_image"
            accept="image/*"
          />
          <textarea
            required={!isEdit}
            placeholder="Product Description"
            name="product_description"
            id="product_description"
            cols="30"
            rows="10"
            value={product_description}
            onChange={handleChangeFormInput}
          ></textarea>
          <button
            name="intent"
            value={isEdit ? "edit" : "add"}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </Form>
      </div>
    </div>
  );
}

export default index;

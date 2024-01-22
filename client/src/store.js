import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  search: "",
  price_sort: "highest to lowest",
  category: "all",
  products: [],
  isEdit: false,

  quantity: 0,

  cart: {},

  isLoading: false,
  product_name: "",
  product_price: "",
  product_description: "",
  product_category: "",
  image: [],
};

const store = (set, get) => ({
  ...initialState,
  handleChange: (e) => set({ [e.target.name]: e.target.value }),

  resetQuantity: () => set({ quantity: 1 }),

  addToCart: ({ product_name, _id, product_price }) =>
    set((state) => {
      set({ quantity: state.quantity + 1 });

      return {
        cart: {
          ...state.cart,
          product_name,
          _id,
          product_price,
        },
      };
    }),

  deleteCart: () => set({ cart: {} }),

  decrementQuantity: () =>
    set((state) => {
      if (state.quantity <= 1) {
        return {
          quantity: 1,
        };
      }

      return {
        quantity: state.quantity - 1,
      };
    }),

  setProducts: (input_product) => set({ products: input_product }),

  toggleEdit: () => {},

  activateEdit: () => set({ isEdit: true }),
  deactivateEdit: () => set({ isEdit: false }),

  activateLoading: () => set({ isLoading: true }),
  deactivateLoading: () => set({ isLoading: false }),

  setTempData: (
    input_id,
    input_name,
    input_price,
    input_description,
    input_category,
    input_secure_url
  ) =>
    set({
      _id: input_id,
      product_name: input_name,
      product_price: input_price,
      product_description: input_description,
      product_category: input_category,
      image: input_secure_url,
    }),

  handleChangeFormInput: (e) => set({ [e.target.name]: e.target.value }),

  resetInputs: () =>
    set({
      product_name: "",
      product_price: "",
      product_description: "",
      product_category: "",
    }),
});

export const useStore = create(devtools(store));

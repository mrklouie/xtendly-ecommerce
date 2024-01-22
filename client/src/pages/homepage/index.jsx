import React, { useState, useMemo } from "react";
import { useLoaderData, useActionData, Link, Outlet } from "react-router-dom";
import styles from "./homepage.module.scss";
import { useStore } from "../../store";
function Index() {
  const [searchValue, setSearchValue] = useState("");

  const {
    handleChange,
    search,
    price_sort,
    category,
    deactivateEdit,
    resetInputs,
  } = useStore((state) => ({
    handleChange: state.handleChange,
    search: state.search,
    price_sort: state.price_sort,
    category: state.category,
    deactivateEdit: state.deactivateEdit,
    resetInputs: state.resetInputs,
  }));

  // I used a debounce to delay the fetching of data
  const debounce = () => {
    let timeoutId;
    return (e) => {
      clearTimeout(timeoutId);
      setSearchValue(e.target.value);
      timeoutId = setTimeout(() => {
        handleChange(e);
      }, 1000);
    };
  };

  const debounceSearch = useMemo(() => debounce(), []);

  return (
    <div className={styles["main-container"]}>
      <div className={styles["main-container__wrapper"]}>
        <div className={styles["main-container__contents"]}>
          <header className={styles.header}>
            <nav>
              <div className={styles.left}>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        deactivateEdit();
                        resetInputs();
                      }}
                      to="add-product"
                    >
                      Add Product
                    </Link>
                  </li>
                  <li>
                    <Link to="cart">Cart</Link>
                  </li>
                </ul>
              </div>
              <div className={styles.right}>
                <input
                  className={styles.search}
                  type="text"
                  name="search"
                  placeholder="search a product"
                  onChange={debounceSearch}
                  value={searchValue}
                />
                <select
                  className={styles["price_sort"]}
                  name="price_sort"
                  id="price_sort"
                  onChange={handleChange}
                  value={price_sort}
                >
                  <option value="highest to lowest">Highest to lowest</option>
                  <option value="lowest to highest">Lowest to Highest</option>
                </select>

                <select
                  className={styles["category"]}
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={category}
                >
                  <option value="all">All</option>
                  <option value="foods">Foods</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
            </nav>
          </header>

          <main className={styles["body-contents"]}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Index;

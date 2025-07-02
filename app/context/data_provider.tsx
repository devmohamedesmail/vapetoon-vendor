import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { api } from "../config/api";

export const DataContext = createContext({ categories: [], products: [] });

export default function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // ----------------------  fetch categories ----------------------------------
  const fetch_categories_data = async () => {
    try {
      const response = await axios.get(
        `${api.baseURL}/categories?populate=image`,
        {
          headers: {
            Authorization: `Bearer ${api.token}`,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log("error fetching categories data", error);
    }
  };

  // ----------------------  fetch products ----------------------------------
  const fetch_products_data = async () => {
    try {
      const response = await axios.get(
        `${api.baseURL}/products?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${api.token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log("error fetching categories data", error);
    }
  };

  useEffect(() => {
    fetch_categories_data();
    fetch_products_data();
  }, []);

  return (
    <DataContext.Provider value={{ categories, products }}>
      {children}
    </DataContext.Provider>
  );
}

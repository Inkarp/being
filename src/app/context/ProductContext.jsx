// context/ProductContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [categoryData, setCategoryData] = useState(null);

  return (
    <ProductContext.Provider value={{ categoryData, setCategoryData }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}

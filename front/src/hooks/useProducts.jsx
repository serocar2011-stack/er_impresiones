/* eslint-disable no-useless-catch */
import { useState, useEffect } from 'react';
import { API_URL } from '../config';


export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  // GET Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  const addProduct = async (newProduct) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error(`POST error: ${response.status}`);

      const created = await response.json();
      setProducts(prev => [...prev, created]);
      return created;
    } catch (err) {
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    addProduct,
  };
}
import React from 'react';
import AddProductForm from '../components/AddProductForm';
import { useProducts } from '../hooks/useProducts';

function AddProductPage() {
  const { addProduct } = useProducts();

  return (
    <div>
      <h2>Agregar Producto</h2>
      <AddProductForm onAddProduct={addProduct} />
    </div>
  );
}

export default AddProductPage;
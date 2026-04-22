import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { useProducts } from '../../hooks/useProducts';

const AdminLibreria = () => {
  const { products, isLoading, error, addProduct } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);

  // Note: For now we are using useProducts hook which we updated earlier.
  // In a real app, you might want specialized admin hooks for CRUD.

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-products-container">
      <h2>Gestión de Librería</h2>
      <button onClick={() => setShowAddForm(!showAddForm)} className="add-button">
        {showAddForm ? 'Cancelar' : 'Agregar Nuevo Producto'}
      </button>

      {/* Simplified list for admin */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id || product.id}>
              <td><img src={product.image} alt={product.name} width="50" /></td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.finalPrice ? Number(product.finalPrice).toFixed(2) : product.price}</td>
              <td>
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLibreria;

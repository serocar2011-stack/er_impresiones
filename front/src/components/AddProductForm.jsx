import React, { useState } from 'react';
import "../styles/Store.css"


function AddProductForm({ onAddProduct }) {

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 1,
    status: 'AVAILABLE',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newProduct.name && newProduct.price > 0) {

      onAddProduct({
        ...newProduct,
      });

       alert(`Producto cargado!`);

      setNewProduct({
        name: '',
        description: '',
        price: 0,
        image: '',
        quantity: 1,
        status: 'AVAILABLE',
      });

    } else {
      alert('El nombre y el precio son obligatorios.');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className='new-product-wrapper'>
        
        <label className='new-product-imput'>
          Nombre:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Precio ($):
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Estado:
          <select
            name="status"
            value={newProduct.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Disponible</option>
            <option value="NOT AVAILABLE">No disponible</option>
            <option value="DISCONTINUED">Discontinuado</option>
          </select>
        </label>

        <label>
          URL de Imagen:
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
          />
        </label>

      </div>

      <button className="button_product" type="submit">
        Agregar Producto
      </button>
    </form>
  );
}

export default AddProductForm;
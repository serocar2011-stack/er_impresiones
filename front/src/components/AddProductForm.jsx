import React, { useState } from 'react';
import "../styles/Store.css"


function AddProductForm({ onAddProduct }) {

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    img: '',
    alt: ''
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

    if (newProduct.title && newProduct.price > 0) {

      onAddProduct({
        ...newProduct,
        id: Date.now(),
      });

       alert(`Producto cargado!`);

      setNewProduct({
        title: '',
        description: '',
        price: 0,
        img: '',
        alt: ''
      });

    } else {
      alert('El título y el precio son obligatorios.');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className='new-product-wrapper'>
        
        <label className='new-product-imput'>
          Título:
          <input
            
            type="text"
            name="title"
            value={newProduct.title}
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
          URL de Imagen:
          <input
            type="text"
            name="img"
            value={newProduct.img}
            onChange={handleChange}
          />
        </label>

        <label>
          Texto Alternativo (Alt):
          <input
            type="text"
            name="alt"
            value={newProduct.alt}
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
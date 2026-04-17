import React from 'react';
import ProductCard from "../ProductCard";
import { useProducts } from "../../hooks/useProducts";

function Store() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <h2>Cargando productos...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="store-page-layout">
      <h2>Nuestros productos</h2>

      <article className="store-container">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            img={item.img}
            alt={item.alt}
            description={item.description}
            price={item.price}
          />
        ))}
      </article>
    </div>
  );
}

export default Store;
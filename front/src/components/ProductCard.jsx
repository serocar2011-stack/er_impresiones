import "../styles/Store.css"
import React from 'react'; 

function ProductCard({ title, img, alt, description, price }) {
   return (


<div className="card">
<h3 className="card-title">{title}</h3>
<img 
className="articulos" 
src={img} 
alt={alt} 
/>
<p>{description}</p>
<h2>Precio: ${price}</h2>
<button className="button-card">
<p>Agregar a Carrito</p>
</button>
</div>
);
}

export default ProductCard;
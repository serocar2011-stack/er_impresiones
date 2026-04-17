import React from 'react'
import "../styles/Print.css"

function DatosCliente({ pedido, setPedido }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPedido(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section>
      <h3 className='titulos'>COMPLETA TUS DATOS</h3>
      <form>

        <label htmlFor="nombre">NOMBRE</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          autoComplete="name"       // ← agregado
          value={pedido.nombre}
          onChange={handleChange}
        />

        <label htmlFor="telefono">TELEFONO</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          autoComplete="tel"        // ← agregado
          value={pedido.telefono}
          onChange={handleChange}
        />

        <label htmlFor="email">E-MAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"      // ← agregado
          value={pedido.email}
          onChange={handleChange}
        />

      </form>
    </section>
  )
}

export default DatosCliente;
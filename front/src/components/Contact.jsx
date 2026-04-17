import React, { useState } from 'react'
import "../styles/Contact.css"
import Gmap from './Gmap'

function Contact() {

  const [comentario, setComentario] = useState("");

  const handleEnviar = () => {
    /* si el comentario esta vacio te da un aviso y vuelve al pcipio*/
    if (!comentario.trim()) {
      alert("No podes enviar un comentario vacio!");
      return;
    }

   /* Guardar en localStorage */
    localStorage.setItem("comentario", comentario);
  /* aviso de consulta enviada */
    alert("Consulta enviada");

    /* Vaciar texto cuando ya envio el comentario */
    setComentario("");
  };
    /* para boton de reseteo */
  const handleReset = () => {
    setComentario("");
  };

  return (
    <>
      <div>
        <h3 className='titulos'>NUESTRA UBICACION</h3>
        <Gmap />

        
      </div>

      <h3 className='titulos'>ENVIANOS TU CONSULTA</h3>

      <div className="contacto">
        <textarea
          className="comentarios"
          id="text"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>

        <div className="actions">
          <button className="send" onClick={handleEnviar}>
            ENVIAR
          </button>

          <button className="reset" onClick={handleReset}>
            BORRAR
          </button>
        </div>
      </div>
    </>
  );
}

export default Contact;

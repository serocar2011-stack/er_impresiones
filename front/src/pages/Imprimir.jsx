import FileLoad from '../components/FileLoad';
import DatosCliente from '../components/DatosCliente';
import useFileInputs from '../hooks/useFileImput';
import "../styles/Print.css"
import { useState } from 'react';

function Imprimir() {

  const { 
    fileInputs, 
    handleAddFileInput, 
    handleRemoveFileInput, 
    handleFileChange 
  } = useFileInputs();

  /* pedido */
  const [pedido, setPedido] = useState({
    nombre: "",
    telefono: "",
    email: "",
    archivos: []
  });

  const handleConfirmacion = () => {

    if (!pedido.nombre.trim() || !pedido.email.trim()) {
      alert("Completar datos!");
      return;
    }

    /* pedido completo */
    const pedidoFinal = {
      ...pedido,
      archivos: fileInputs
    };

    /* Guardar en localStorage como JSON */
    localStorage.setItem("pedido", JSON.stringify(pedidoFinal));

    alert("Pedido enviado");

    /* Reiniciar todo */
    setPedido({
      nombre: "",
      telefono: "",
      email: "",
      archivos: []
    });
  };

  return (
    <>
      <h3 className='titulos-print'>CARGA TUS ARCHIVOS</h3>

      <section>
        {fileInputs.map((item) => (
          <div key={item.id} className='carga-archivos'>

            <FileLoad
              id={item.id}
              fileName={item.fileName}
              pages={item.pages}
               color={item.color}
              faz={item.faz}
              onFileChange={handleFileChange}
            />

            <button
              className='button-action'
              type="button"
              onClick={() => handleRemoveFileInput(item.id)}
            >
              <i className="fa-solid fa-trash-can"></i> ELIMINAR
            </button>
          </div>
        ))}

        <button
          className='button-action'
          type="button"
          onClick={handleAddFileInput}
        >
          <i className="fa-solid fa-plus"></i>
          <i className="fa-solid fa-file-arrow-up"></i> AGREGAR ARCHIVO
        </button>
      </section>

      {/* Datos del cliente */}
      <DatosCliente pedido={pedido} setPedido={setPedido} />

      <div className="confirmacion">
        <button
          className='button-action'
          type="button"
          onClick={handleConfirmacion}
        >
          CONFIRMAR PEDIDO
        </button>
      </div>
    </>
  );
}

export default Imprimir;

import FileLoad from '../components/FileLoad';
import DatosCliente from '../components/DatosCliente';
import useFileInputs from '../hooks/useFileImput';
import "../styles/Print.css"
import { useState } from 'react';
import { API_URL } from '../config';

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
    apellido: "",
    telefono: "",
    email: "",
  });

  const handleConfirmacion = async () => {

    if (!pedido.nombre.trim() || !pedido.apellido.trim() || !pedido.email.trim() || !pedido.telefono.trim()) {
      alert("Completar todos los datos del cliente!");
      return;
    }

    if (fileInputs.length === 0 || !fileInputs[0].fileName) {
      alert("Debes agregar al menos un archivo!");
      return;
    }

    try {
      // Subir archivos primero
      const uploadedFiles = await Promise.all(fileInputs.map(async (item) => {
        if (!item.file) {
          throw new Error("Falta archivo en una de las selecciones");
        }

        // Check file size (4.5MB limit for Vercel Hobby)
        const MAX_SIZE = 4.5 * 1024 * 1024;
        if (item.file.size > MAX_SIZE) {
           throw new Error(`El archivo ${item.fileName} es muy grande (${(item.file.size / (1024 * 1024)).toFixed(2)}MB). El limite es 4.5MB.`);
        }

        console.log(`Subiendo archivo a: ${API_URL}/files/upload`);
        const formData = new FormData();
        formData.append("file", item.file);

        const uploadRes = await fetch(`${API_URL}/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          let errorMsg = `Status: ${uploadRes.status}`;
          try {
            const errorData = await uploadRes.json();
            errorMsg = errorData.message || errorMsg;
          } catch (e) {
            const text = await uploadRes.text().catch(() => "");
            if (text) errorMsg += ` - ${text.substring(0, 100)}`;
          }
          throw new Error(`Error al subir archivo ${item.fileName}: ${errorMsg}`);
        }

        const uploadData = await uploadRes.json();

        return {
          fileName: item.fileName,
          fileUrl: uploadData.url,
          pages: item.pages || 0,
          color: item.color,
          faz: item.faz
        };
      }));

      /* Preparar payload para la API */
      const pedidoFinal = {
        cliente: {
          nombre: pedido.nombre,
          apellido: pedido.apellido,
          email: pedido.email,
          telefono: pedido.telefono
        },
        files: uploadedFiles
      };

      const response = await fetch(`${API_URL}/fullprintjobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoFinal)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el pedido');
      }

      const data = await response.json();
      console.log('Pedido enviado con éxito:', data);
      alert("Pedido enviado correctamente!");

      /* Reiniciar todo */
      setPedido({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
      });
      // Note: useFileInputs might need a reset method, but for now we'll just reload or the user can manual reset
      window.location.reload(); 

    } catch (error) {
      console.error('Error:', error);
      alert("Hubo un error al enviar el pedido: " + error.message);
    }
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

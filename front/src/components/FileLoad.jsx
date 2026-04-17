import { useState } from "react";
import { countPdfPages } from "../utils/countPdfPages";
import "../styles/Print.css";

function FileLoad({ id, onFileChange, color, faz }) {

  const [pages, setPages] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let totalPages = null;

    if (file.type === "application/pdf") {
      totalPages = await countPdfPages(file);
      setPages(totalPages);
    }

    setFileName(file.name);

    onFileChange(id, {
      file,
      fileName: file.name,
      pages: totalPages,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFileChange(id, { [name]: value });
  };

  return (
    <ul className="carga-archivos">

      <li>
        <input className="files"
          type="file"
          id={`file-${id}`}
          name={`file-${id}`}
          onChange={handleFile}
        />

        {fileName && (
          <p className="file-name">
            {fileName} ({pages ?? "?"} páginas)
          </p>
        )}
      </li>

      <li>
        <select
          id={`color-${id}`}
          name="color"
          value={color}
          onChange={handleSelectChange}
        >
          <option value="Color">Color</option>
          <option value="Blanco y negro">Blanco y Negro</option>
        </select>
      </li>

      <li>
        <select
          id={`faz-${id}`}
          name="faz"
          value={faz}
          onChange={handleSelectChange}
        >
          <option value="simple">Simple Faz</option>
          <option value="doble">Doble Faz</option>
        </select>
      </li>

    </ul>
  );
}

export default FileLoad;
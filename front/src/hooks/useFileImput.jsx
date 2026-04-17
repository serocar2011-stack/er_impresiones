import { useState } from "react";

function useFileInputs() {

  const generateId = () => Date.now() + Math.random();

  const [fileInputs, setFileInputs] = useState([
    {
      id: generateId(),
      file: null,
      fileName: "",
      pages: null,
      color: "Color",     
      faz: "simple"       
    }
  ]);

  const handleAddFileInput = () => {
    setFileInputs(prev => [
      ...prev,
      {
        id: generateId(),
        file: null,
        fileName: "",
        pages: null,
        color: "Color",
        faz: "simple"
      }
    ]);
  };

  const handleRemoveFileInput = (id) => {
    setFileInputs(prev => prev.filter(item => item.id !== id));
  };

  const handleFileChange = (id, newData) => {
    setFileInputs(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, ...newData }
          : item
      )
    );
  };

  return {
    fileInputs,
    handleAddFileInput,
    handleRemoveFileInput,
    handleFileChange
  };
}

export default useFileInputs;
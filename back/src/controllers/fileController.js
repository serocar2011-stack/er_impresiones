import {
  createFileService,
  getFilesByPrintJobService,
  getAllFilesService,
  deleteFileService
} from "../services/fileService.js"
import { put } from '@vercel/blob';

export const createFileController = async (req, res, next) => {
  try {

    const file = await createFileService(req.body)

    res.status(201).json(file)

  } catch (error) {
    next(error)
  }
}

export const getFilesByPrintJobController = async (req, res, next) => {
  try {

    const { printJobId } = req.params

    const files = await getFilesByPrintJobService(printJobId)

    res.json(files)

  } catch (error) {
    next(error)
  }
}

export const getAllFilesController = async (req, res, next) => {
  try {

    const files = await getAllFilesService()

    res.json(files)

  } catch (error) {
    next(error)
  }
}

export const deleteFileController = async (req, res, next) => {
  try {

    const { id } = req.params

    await deleteFileService(id)

    res.json({ message: "Archivo eliminado" })

  } catch (error) {
    next(error)
  }
}

export const uploadFileController = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("Upload attempt without file");
      return res.status(400).json({ message: "No se proporcionó ningún archivo" });
    }

    const { originalname, buffer, size } = req.file;
    console.log(`Recibiendo archivo: ${originalname} (${size} bytes)`);

    // Sanitizar el nombre del archivo: reemplazar espacios por guiones bajos y eliminar caracteres especiales
    const sanitizedName = originalname
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');
    
    console.log(`Nombre sanitizado: ${sanitizedName}`);

    const blob = await put(sanitizedName, buffer, {
      access: 'public',
    });

    console.log(`Archivo subido exitosamente a: ${blob.url}`);
    res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error("Error en uploadFileController:", error);
    res.status(500).json({ message: `Error del servidor al subir a Blob: ${error.message}` });
  }
};
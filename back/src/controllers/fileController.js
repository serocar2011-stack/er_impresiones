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
      return res.status(400).json({ message: "No se proporcionó ningún archivo" });
    }

    const { originalname, buffer } = req.file;

    // Sanitizar el nombre del archivo: reemplazar espacios por guiones bajos y eliminar caracteres especiales
    const sanitizedName = originalname
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    const blob = await put(sanitizedName, buffer, {
      access: 'public',
    });

    res.status(200).json({ url: blob.url });
  } catch (error) {
    next(error);
  }
};
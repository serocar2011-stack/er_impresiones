import {
  createFileService,
  getFilesByPrintJobService,
  getAllFilesService,
  deleteFileService
} from "../services/fileService.js"

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
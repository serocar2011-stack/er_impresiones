import { File } from "../models/fileModel.js"

export const createFileService = (data) => {
  return File.create(data)
}

export const getFilesByPrintJobService = (printJobId) => {
  return File.find({ printJob: printJobId })
}

export const getAllFilesService = () => {
  return File.find()
}

export const deleteFileService = (id) => {
  return File.findByIdAndDelete(id)
}
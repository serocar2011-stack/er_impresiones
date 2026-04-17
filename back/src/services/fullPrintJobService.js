import { Cliente } from "../models/clienteModel.js"
import { PrintJob } from "../models/printJobModel.js"
import { File } from "../models/fileModel.js"
import { calculatePrintJobTotals } from "../utils/calculatePrintJobTotal.js"

export const createFullPrintJobService = async (data) => {
  const { cliente, files } = data

  

  //  Validación
  if (!cliente || !files || files.length === 0) {
    throw new Error("Cliente y files son requeridos")
  }

  // Buscar cliente existente por email
  let existingCliente = await Cliente.findOne({ email: cliente.email })

  //  Crear cliente si no existe
  if (!existingCliente) {
    existingCliente = await Cliente.create(cliente)
  }

  // Calculo totales usando utils
  const { totalPages, totalPrice } = calculatePrintJobTotals(files)

  // Crear PrintJob
  const newPrintJob = await PrintJob.create({
    cliente: existingCliente._id,
    totalPages,
    totalPrice,
    status: "pending"
  })

  // referenciar files al printJob

  const filesWithJob = files.map(file => ({
    ...file,
    printJob: newPrintJob._id
  }))

  // Insertar archivos
  await File.insertMany(filesWithJob)

  // Traer resultado final
  const result = await PrintJob.findById(newPrintJob._id)
    .populate("cliente")
    .populate("files")

      return result
}


export const getAllPrintJobsService = async () => {
  return await PrintJob.find()
    .populate("cliente")
    .populate("files")
}


export const getPrintJobByIdService = async (id) => {

  const files = await File.find({ printJob: id })

  return await PrintJob.findById(id)
    .populate("cliente")
    .populate("files")
}

export const deleteFullPrintJobService = async (id) => {
  // 1. Verificar que exista el printJob
  const printJob = await PrintJob.findById(id)

  if (!printJob) {
    throw new Error("PrintJob no encontrado")
  }

  // 2. Eliminar todos los files asociados
  await File.deleteMany({ printJob: id })

  // 3. Eliminar el printJob
  await PrintJob.findByIdAndDelete(id)

  return { message: "PrintJob y sus archivos eliminados correctamente" }
}

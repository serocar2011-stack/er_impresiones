import { PrintJob } from "../models/printJobModel.js"
import { Cliente } from "../models/clienteModel.js"
import { File } from "../models/fileModel.js"
import { calculatePrintJobTotals } from "../utils/calculatePrintJobTotal.js"

// ---------------- CRUD ----------------

export const createPrintJobService = (data) => {
  return PrintJob.create(data)
}

export const getAllPrintJobsService = () => {
  return PrintJob.find().populate("cliente").populate("files")
}

export const getPrintJobByIdService = async (id) => {
  return await PrintJob.findById(id)
    .populate("cliente")
    .populate("files")
}

export const updatePrintJobService = (id, data) => {
  return PrintJob.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

export const deletePrintJobService = (id) => {
  return PrintJob.findByIdAndDelete(id)
}

// Pedido completo

export const createFullPrintJobService = async (data) => {
  const { cliente, files } = data

  if (!cliente || !files || files.length === 0) {
    throw new Error("Cliente y files son requeridos")
  }

  let existingCliente = await Cliente.findOne({ email: cliente.email })

  if (!existingCliente) {
    existingCliente = await Cliente.create(cliente)
  }

  const { totalPages, totalPrice } = calculatePrintJobTotals(files)

  const newPrintJob = await PrintJob.create({
    cliente: existingCliente._id,
    totalPages,
    totalPrice,
    status: "pending"
  })

  const filesWithJob = files.map(file => ({
    ...file,
    printJob: newPrintJob._id
  }))

  await File.insertMany(filesWithJob)

  return await PrintJob.findById(newPrintJob._id)
    .populate("cliente")
    .populate("files")
}

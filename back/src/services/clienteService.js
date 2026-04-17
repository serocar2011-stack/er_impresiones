import { checkModelExist } from "../helpers/checkExist.js"
import { Cliente } from "../models/clienteModel.js"


export const createClienteService = async(clienteData) => {

const { nombre, apellido } = clienteData


  return Cliente.create(clienteData)
}

export const getAllClientesService = () => {
  return Cliente.find()
}

export const getClienteByIdService = (id) => {
  return Cliente.findById(id)
}

export const updateClienteService = (id, data) => {
  return Cliente.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

export const deleteClienteService = (id) => {
  return Cliente.findByIdAndDelete(id)
}
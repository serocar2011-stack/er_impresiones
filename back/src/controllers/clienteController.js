import {
  createClienteService,
  getAllClientesService,
  getClienteByIdService,
  updateClienteService,
  deleteClienteService
} from "../services/clienteService.js"

import mongoose from "mongoose"

/* crear cliente*/
export const createClienteController = async (req, res, next) => {
  try {
    const cliente = await createClienteService(req.body)
    res.status(201).json(cliente)
  } catch (error) {
    next(error)
  }
}

/* traer todos los clientes */
export const getAllClientesController = async (req, res, next) => {
  try {
    const clientes = await getAllClientesService()
    res.status(200).json(clientes)
  } catch (error) {
    next(error)
  }
}

/* traer cliente por id */
export const getClienteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params

    // Validacion
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const cliente = await getClienteByIdService(id)

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.status(200).json(cliente)
  } catch (error) {
    next(error)
  }
}

/* Actualizar cliente */

export const updateClienteController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const cliente = await updateClienteService(id, req.body)

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.status(200).json(cliente)
  } catch (error) {
    next(error)
  }
}

/* Borrar cliente */

export const deleteClienteController = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const cliente = await deleteClienteService(id)

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.status(200).json({ message: "Cliente eliminado correctamente" })
  } catch (error) {
    next(error)
  }
}
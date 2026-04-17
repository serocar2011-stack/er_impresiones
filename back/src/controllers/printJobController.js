import {
  createPrintJobService,
  getAllPrintJobsService,
  getPrintJobByIdService,
  updatePrintJobService,
  deletePrintJobService
} from "../services/printJobService.js"

import mongoose from "mongoose"

export const createPrintJobController = async (req, res, next) => {
  try {

    const job = await createPrintJobService(req.body)

    res.status(201).json(job)

  } catch (error) {
    next(error)
  }
}

export const getAllPrintJobsController = async (req, res, next) => {
  try {

    const jobs = await getAllPrintJobsService()

    res.json(jobs)

  } catch (error) {
    next(error)
  }
}

export const getPrintJobByIdController = async (req, res, next) => {
  try {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const job = await getPrintJobByIdService(id)

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" })
    }

    res.json(job)

  } catch (error) {
    next(error)
  }
}

export const updatePrintJobController = async (req, res, next) => {
  try {

    const { id } = req.params

    const job = await updatePrintJobService(id, req.body)

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" })
    }

    res.json(job)

  } catch (error) {
    next(error)
  }
}

export const deletePrintJobController = async (req, res, next) => {
  try {

    const { id } = req.params

    const job = await deletePrintJobService(id)

    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" })
    }

    res.json({ message: "Trabajo eliminado" })

  } catch (error) {
    next(error)
  }
}
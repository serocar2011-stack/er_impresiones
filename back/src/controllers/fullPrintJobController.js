
import { createFullPrintJobService, getPrintJobByIdService } from "../services/printJobService.js"
import { deleteFullPrintJobService } from "../services/fullPrintJobService.js"

export const createFullPrintJobController = async (req, res) => {
  try {
    const result = await createFullPrintJobService(req.body)

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

import { getAllPrintJobsService } from "../services/printJobService.js"

export const getAllFullPrintJobsController = async (req, res) => {
  try {
    const result = await getAllPrintJobsService()

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const getFullPrintJobByIdController = async (req, res) => {
  try {
    const job = await getPrintJobByIdService(req.params.id)
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteFullPrintJobController = async (req, res) => {
  try {
    const result = await deleteFullPrintJobService(req.params.id)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
import { Router } from "express"

import {
  createFileController,
  getFilesByPrintJobController,
  deleteFileController, getAllFilesController
} from "../controllers/fileController.js"

const router = Router()

// crear archivo
router.post("/", createFileController)

// traer archivos de un trabajo
router.get("/", getAllFilesController)

router.get("/printjob/:printJobId", getFilesByPrintJobController)

// borrar archivo
router.delete("/:id", deleteFileController)

export default router
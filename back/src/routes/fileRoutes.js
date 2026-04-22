import { Router } from "express"

import {
  createFileController,
  getFilesByPrintJobController,
  deleteFileController, getAllFilesController
} from "../controllers/fileController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"

const router = Router()

// crear archivo
router.post("/", createFileController)

// traer archivos de un trabajo
router.get("/", verifyTokenMiddleware, getAllFilesController)

router.get("/printjob/:printJobId", verifyTokenMiddleware, getFilesByPrintJobController)

// borrar archivo
router.delete("/:id", verifyTokenMiddleware, deleteFileController)

export default router
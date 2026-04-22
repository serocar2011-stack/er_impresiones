import { Router } from "express"
import multer from "multer"

import {
  createFileController,
  getFilesByPrintJobController,
  deleteFileController, getAllFilesController, uploadFileController
} from "../controllers/fileController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

// subir archivo a Vercel Blob
router.post("/upload", upload.single("file"), uploadFileController)

// crear archivo
router.post("/", createFileController)

// traer archivos de un trabajo
router.get("/", verifyTokenMiddleware, getAllFilesController)

router.get("/printjob/:printJobId", verifyTokenMiddleware, getFilesByPrintJobController)

// borrar archivo
router.delete("/:id", verifyTokenMiddleware, deleteFileController)

export default router
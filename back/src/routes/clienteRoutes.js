import { Router } from "express"
import {createClienteController,
  deleteClienteController,
  getAllClientesController, 
  updateClienteController
} from "../controllers/clienteController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"

const router = Router()

router.post("/", createClienteController)
router.get("/", verifyTokenMiddleware, getAllClientesController)
router.patch("/:id", verifyTokenMiddleware, updateClienteController)
router.delete("/:id", verifyTokenMiddleware, deleteClienteController)


export default router
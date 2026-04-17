import { Router } from "express"
import {createClienteController,
  deleteClienteController,
  getAllClientesController, 
  updateClienteController
} from "../controllers/clienteController.js"

const router = Router()

router.post("/", createClienteController)
router.get("/", getAllClientesController)
router.patch("/:id", updateClienteController)
router.delete("/:id", deleteClienteController)


export default router
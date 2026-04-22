import express from 'express'

import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct} from '../controllers/productController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'


const router = express.Router()


// Crear producto 
router.post("/", verifyTokenMiddleware, createProduct)


// traer todos
router.get("/", getAllProduct)

// traer uno por id
router.get("/:id", getProductById)


// modificar por id
router.patch("/:id", verifyTokenMiddleware, updateProduct)

// borrar por id
router.delete("/:id", verifyTokenMiddleware, deleteProduct)


export default router
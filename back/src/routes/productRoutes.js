import express from 'express'

import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct} from '../controllers/productController.js'


const router = express.Router()


// Crear producto 
router.post("/", createProduct)


// traer todos
router.get("/", getAllProduct)

// traer uno por id
router.get("/:id", getProductById)


// modificar por id
router.patch("/:id", updateProduct)

// borrar por id
router.delete("/:id", deleteProduct)


export default router
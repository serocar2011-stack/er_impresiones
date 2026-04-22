import express from "express"
import {createCategory, deleteCategory, getAllCategory} from "../controllers/categoryController.js" 
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"



const categoryRouter = express.Router()

categoryRouter.get("/", getAllCategory)
categoryRouter.post("/", verifyTokenMiddleware, createCategory)
categoryRouter.delete("/:id", verifyTokenMiddleware, deleteCategory)

export default categoryRouter
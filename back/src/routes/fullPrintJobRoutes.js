import express from "express"
import { createFullPrintJobController,deleteFullPrintJobController,getAllFullPrintJobsController, getFullPrintJobByIdController } from "../controllers/fullPrintJobController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"

const fullPrintJobRouter = express.Router()

fullPrintJobRouter.post("/", createFullPrintJobController)
fullPrintJobRouter.get("/", verifyTokenMiddleware, getAllFullPrintJobsController)
fullPrintJobRouter.get("/:id", verifyTokenMiddleware, getFullPrintJobByIdController)
fullPrintJobRouter.delete("/:id", verifyTokenMiddleware, deleteFullPrintJobController)




export default fullPrintJobRouter
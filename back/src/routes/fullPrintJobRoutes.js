import express from "express"
import { createFullPrintJobController,deleteFullPrintJobController,getAllFullPrintJobsController, getFullPrintJobByIdController } from "../controllers/fullPrintJobController.js"

const fullPrintJobRouter = express.Router()

fullPrintJobRouter.post("/", createFullPrintJobController)
fullPrintJobRouter.get("/", getAllFullPrintJobsController)
fullPrintJobRouter.get("/:id", getFullPrintJobByIdController)
fullPrintJobRouter.delete("/:id", deleteFullPrintJobController)




export default fullPrintJobRouter
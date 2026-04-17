import { Router } from "express"
import {createPrintJobController,} from "../controllers/printJobController.js"

const router = Router()

router.post("/", createPrintJobController)


export default router
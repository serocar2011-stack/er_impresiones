import express from "express"
import { createUser, deleteUser, getUser, updateUser, validateUser } from "../controllers/userController.js"
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"



const userRouter = express.Router()
userRouter.post ("/", verifyTokenMiddleware, createUser)
userRouter.get ("/", verifyTokenMiddleware, getUser)
userRouter.patch ("/:id", verifyTokenMiddleware, updateUser )
userRouter.delete("/:id", verifyTokenMiddleware, deleteUser)
userRouter.post("/login", validateUser)


export default userRouter

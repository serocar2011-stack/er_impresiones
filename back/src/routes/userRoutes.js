import express from "express"
import { createUser, deleteUser, getUser, updateUser, validateUser } from "../controllers/userController.js"



const userRouter = express.Router()
userRouter.post ("/", createUser)
userRouter.get ("/", getUser)
userRouter.patch ("/:id", updateUser )
userRouter.delete("/:id", deleteUser)
userRouter.post("/login", validateUser)


export default userRouter

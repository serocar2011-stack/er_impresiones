import { createUserService, getUserService, updateUserService, deleteUserService, validateUserService } from "../services/userService.js"

// ==========================
// CREATE USER
// ==========================
export const createUser = async (req, res, next) => {
    try {
        const userData = req.body
        const newUser = await createUserService(userData)   
        res.status(201).json({ message: "User created", data: newUser })

    } catch (error) {
        next(error)
    }
}

// ==========================
// GET USERS
// ==========================
export const getUser = async (req, res, next) => {
    try {
        const users = await getUserService()
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

// ==========================
// UPDATE USER
// ==========================
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const userData = req.body
        const updatedUser = await updateUserService(id, userData)
        res.status(201).json(updatedUser)

    } catch (error) {
        next(error)
    }
}

// ==========================
// DELETE USER
// ==========================
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserService(id)
        res.status(201).json(deletedUser)

    } catch (error) {
        next(error)
    }
}

// ==========================
// LOGIN / VALIDATE USER
// ==========================
export const validateUser = async (req, res, next) => {
    try {
        const userData = req.body
        const result = await validateUserService(userData)

        res.status(200).json({
            message: "Login exitoso",
            token: result.token,
            user: result.userEmail
        })

    } catch (error) {
        next(error)
    }
}
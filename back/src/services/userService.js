import { checkModelExist } from '../helpers/checkExist.js'
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const SECRET = process.env.JWT_SECRET

export const createUserService = async (userData) => {
    const {email} = userData
    console.log({userData})
    const response = await checkModelExist(User, {email}, false, 400, `User with email ${email} already exist`)
    console.log({response})
    const newUser = new User(userData)
    const savedUser = await newUser.save()
    return savedUser
    // luego quitar contraseña
}

export const getUserService = async () => {
    // -password no muestra password en la respuesta
    const users = await User.find().select("-password")
    return users
}

export const updateUserService = async (id, userData) => {
    await checkModelExist(User, {_id: id}, true, 400, `User not found`)

    // En la edicion del usuario si modifican la password deberiamos encriptarla
    if(userData.password){
        userData.password = bcrypt.hashSync(userData.password, 10)
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        userData,
        { returnDocument: 'after' }
    )

    return updatedUser
}

export const deleteUserService = async (id) => {
    await checkModelExist(User, {_id: id}, true, 400, `User not found`)

    
    const deletedUser = await User.findByIdAndDelete(id)

    return { message: "User deleted", data: deletedUser }
}

export const validateUserService = async (userData) => {
    const { password, email } = userData

    if (!(password && email)) {
        throw new Error("Email y contraseña son requeridos")
    }

    const userFound = await checkModelExist(User, { email }, true, null, "El usuario no existe")

    if (!userFound) {
        throw new Error("Usuario no existe")
    }

    const isMatch = bcrypt.compareSync(password, userFound.password)

    if (!isMatch) {
        throw new Error("Contraseña incorrecta")
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

    return {
        token,
        userId: userFound._id,
        userEmail: userFound.email
    }
}
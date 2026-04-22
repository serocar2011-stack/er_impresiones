import jwt from "jsonwebtoken"
import { SECRET } from "../config/config.js"

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error("Token inválido o expirado")
    }
}

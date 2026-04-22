import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
import User from "../src/models/userModel.js";

const MONGODB_URI = process.env.MONGODB_URI;

const createInitialAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a MongoDB...");

        const adminData = {
            name: "Admin",
            lastName: "Principal",
            email: "admin@printsystem.com",
            password: "Admin123" 
        };

        const existingUser = await User.findOne({ email: adminData.email });

        if (existingUser) {
            console.log("El usuario administrador ya existe.");
        } else {
            const newUser = new User(adminData);
            await newUser.save();
            
            console.log("Usuario administrador creado exitosamente:");
            console.log(`Email: ${adminData.email}`);
            console.log(`Password: ${adminData.password}`);
           
        }

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("Error al crear el administrador:", error);
        process.exit(1);
    }
};

createInitialAdmin();

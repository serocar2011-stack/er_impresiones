import mongoose from "mongoose"

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
   apellido: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  telefono: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email inválido"
    ]
  },

}, { timestamps: true, versionKey: false })

export const Cliente = mongoose.model("Cliente", clienteSchema)
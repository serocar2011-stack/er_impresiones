import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({

  printJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PrintJob",
    required: true
  },

  fileName: {
    type: String,
    required: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  pages: {
    type: Number,
    required: true
  },

  color: {
    type: String,
    enum: ["Color", "Blanco y negro"],
    default: "Blanco y negro"
  },

  faz: {
    type: String,
    enum: ["simple", "doble"],
    default: "simple"
  }

}, { timestamps: true })

export const File = mongoose.model("File", fileSchema)
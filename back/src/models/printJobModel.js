import mongoose from "mongoose"

const printJobSchema = new mongoose.Schema({

  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },

  totalPages: {
    type: Number,
    default: 0
  },

  totalPrice: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["pending", "printing", "done"],
    default: "pending"
  }

}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

printJobSchema.virtual("files", {
  ref: "File",
  localField: "_id",
  foreignField: "printJob"
})



export const PrintJob = mongoose.model("PrintJob", printJobSchema)
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [40, "Please keep name field under 40 characters"],
    minLength: [2, "Please keep name field above 2 characters"],
    trim: true,
    lowercase: true,
  },

  lastName: {
    type: String,
    required: true,
    maxLength: [40, "Please keep name field under 40 characters"],
    minLength: [2, "Please keep name field above 2 characters"],
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please, use a valid email"]
  },

  password: {
    type: String,
    required: true,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/, "Debe contener un número, una mayúscula y entre 6 y 16 caracteres"]
  }

}, { timestamps: true });

userSchema.pre("save", async function () {

    // hasheo
    if (!this.isModified("password")) {
        return;
    }
    
    // Encriptacion
    this.password = bcrypt.hashSync(this.password, 10);
});


export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const statusEnum =["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required :[true, "Name field is required"],
        minLength: 2,
        unique: [true, "Name is an unique field"],
        lowercase: true, 
        trim: true,

    },

    price: {
    type: mongoose.Types.Decimal128,
    required: [true, "Price field is required"],
    min: [0, "Price field has to be a number"],
    set: v => mongoose.Types.Decimal128.fromString(v.toFixed(2)),

    },

    description: {
        type: String,
        minLength: 2,
        maxLength: 100,
        lowercase: true,
        trim: true
    },

    quantity: {
        type: Number,
        min: 1,
        default: 1,
    },


    status: {
        type: String,
        
        validate: {
            validator: function (value) {
                             return statusEnum.includes(value)
            },
            message: props => `${props.value} no es un estado valido`
        }
    },


    category: 
            { type: mongoose.Schema.Types.ObjectId, ref: "category", default: null },

            
    image: String,

    highlighted: Boolean,

    profitRate: {

    /* porcentaje de ganancia por defecto */
        type: Number,
        default: 1.20,
        min: [1, "Profit rate must be grater than 1"]
    },
    image: String
}, { timestamps: true })



productSchema.virtual("finalPrice").get(function () {
    /* multiplica el costo por la ganancia profitRate */
    return this.price * this.profitRate
})

productSchema.set("toJSON", {
    getters: true,
    setters: true,
    virtuals: true
})

export default mongoose.model("product", productSchema)
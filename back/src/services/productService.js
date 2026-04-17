import { checkModelExist } from "../helpers/checkExist.js"
import Product from "../models/productModel.js"

export const createProductService = async (productData) => {
    // creo instancia del producto
    const newProduct = new Product(productData)
    
    // guardo el producto
    const savedProduct = await newProduct.save()

    return savedProduct
}


export const getAllProductService = async () => {
    
    
    // populate("category") hace un llamado a la categoria por el id de cada producto
    
        const products = await Product.find().populate("category")

    return products
}


// Actualizacion de producto por Id
export const updateProductService = async (id, productData) => {

    await checkModelExist(Product, {_id: id}, true, 404, "Product not found")

    const updateProduct = await Product.findByIdAndUpdate(
        {_id: id},
        productData,
        { returnDocument: "after" }
    ).populate("category")

    return updateProduct
}


export const deleteProductService = async (id) => {

    await checkModelExist(Product, {_id: id}, true, 404, "Product not found")

    const deleted = await Product.findByIdAndDelete(id)

    return { message: "Product deleted succesfully", data: deleted }
}


export const getProductByIdService = async (id) => {

    const product = await checkModelExist(Product, {_id: id}, true, 404, "Product not found")

    return product
}
import { 
  createProductService,
  getAllProductService,
  updateProductService,
  deleteProductService,
  getProductByIdService,
} from "../services/productService.js"

import Category from "../models/categoryModel.js"
import { handleError } from "../utils/errorHandler.js"



export const createProduct = async (req, res) => {
  try {

    const { category, ...productData } = req.body

    const categoryDoc = await Category.findOne({ name: category })

    if (!categoryDoc) {
      return res.status(404).json({
        message: "Category not found"
      })
    }

    const savedProduct = await createProductService({
      ...productData,
      category: categoryDoc._id
    })

    res.status(201).json(savedProduct)

  } catch (error) {
    handleError(error, res)
  }
}


export const getAllProduct = async (req, res) => {
  try {

    const products = await getAllProductService()
    res.status(200).json(products)

  } catch (error) {
    handleError(error, res)
  }
}


export const getProductById = async (req, res) => {
  try {

    const { id } = req.params
    const product = await getProductByIdService(id)

    res.status(200).json(product)

  } catch (error) {
    handleError(error, res)
  }
}


export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params
    const { category, ...productData } = req.body

    let categoryId

    if (category) {
      const categoryDoc = await Category.findOne({ name: category })

      if (!categoryDoc) {
        return res.status(404).json({
          message: "Category not found"
        })
      }

      categoryId = categoryDoc._id
    }

    const updatedProduct = await updateProductService(id, {
      ...productData,
      ...(categoryId && { category: categoryId })
    })

    res.status(200).json(updatedProduct)

  } catch (error) {
    handleError(error, res)
  }
}


export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params
    const response = await deleteProductService(id)

    res.status(200).json(response)

  } catch (error) {
    handleError(error, res)
  }
}
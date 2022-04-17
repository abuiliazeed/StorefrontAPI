import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

// create product function
const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
 
    const product = await productModel.createProduct(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product created successfully'
    })
  } catch (err) {
    next(err)
  }
}

// get all products function
const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.getAllProducts()
    res.json({
      status: 'success',
      data: { products },
      message: 'products retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}

// get product by id function
const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getProductById(Number(req.params.id))
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}

// update a product
const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.updateProduct(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'product updated successfully'
    })
  } catch (err) {
    next(err)
  }
}

// delete a product
const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.deleteProduct(Number(req.params.id))
    res.json({
      status: 'success',
      data: product,
      message: 'product deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }

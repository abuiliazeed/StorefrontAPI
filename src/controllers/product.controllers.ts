import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

// create product function
const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the product data from the request body
    const product = await productModel.createProduct(req.body)
    //returning the product created
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
    // returning all the products send through the response
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
    // fetching id from the request params
    const product = await productModel.getProductById(Number(req.params.id))
    // returning the product through the response
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
    // fetching the product data that need to be updated throught the request body
    const product = await productModel.updateProduct(req.body)
    // returning the product updated from the response
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
    // fetching the product id that we want to delete from the request params
    const product = await productModel.deleteProduct(Number(req.params.id))
    // returning the product that we deleted
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

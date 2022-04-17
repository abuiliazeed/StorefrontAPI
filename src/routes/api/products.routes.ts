import { Router, Request, Response } from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../../controllers/product.controllers'
import authenticationMiddleware from '../../middleware/authenticate.middleware'

const productRoutes = Router()
//create product route
productRoutes.post('/', authenticationMiddleware, createProduct)
//get all products route
productRoutes.get('/', authenticationMiddleware, getAllProducts)
//get product by id route
productRoutes.get('/:id', authenticationMiddleware, getProductById)
//update product route
productRoutes.put('/:id', authenticationMiddleware, updateProduct)
//delete product route
productRoutes.delete('/:id', authenticationMiddleware, deleteProduct)

export default productRoutes

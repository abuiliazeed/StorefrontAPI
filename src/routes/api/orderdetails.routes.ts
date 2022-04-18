import { Router, Request, Response } from 'express'
import authenticationMiddleware from '../../middleware/authenticate.middleware'
import {
  createOrderdetails,
  getAllOrderdetails,
  updateOrderdetails,
  deleteOrderdetails
} from '../../controllers/orderdetails.controller'

const orderdetailsRoutes = Router()
//create orderdetails route
orderdetailsRoutes.post('/', authenticationMiddleware, createOrderdetails)
//get all orderdetails route
orderdetailsRoutes.get('/', authenticationMiddleware, getAllOrderdetails)
//update orderdetails route
orderdetailsRoutes.put('/:id', authenticationMiddleware, updateOrderdetails)
//delete orderdetails route
orderdetailsRoutes.delete('/:id', authenticationMiddleware, deleteOrderdetails)

export default orderdetailsRoutes

import { Router, Request, Response } from 'express'
import authenticationMiddleware from '../../middleware/authenticate.middleware'
import { createOrder, getAllOrders, updateOrder } from '../../controllers/order.controller'

const orderRoutes = Router()
//create order route
orderRoutes.post('/', authenticationMiddleware, createOrder)
//get all orders route
orderRoutes.get('/', authenticationMiddleware, getAllOrders)
//update order route
orderRoutes.put('/:id', authenticationMiddleware, updateOrder)

export default orderRoutes

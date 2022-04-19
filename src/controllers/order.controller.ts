import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the order data from the request body
    const order = await orderModel.createOrder(req.body)
    // returning the order created from the response
    res.json({
      status: 'success',
      data: { ...order },
      message: 'order created successfully'
    })
  } catch (err) {
    next(err)
  }
}

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.getAllOrders()
    // returning all the orders throught the response
    res.json({
      status: 'success',
      data: { orders },
      message: 'orders retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the order data to be updated from the request body
    const order = await orderModel.updateOrder(req.body)
    // returning the order updated through the response
    res.json({
      status: 'success',
      data: { ...order },
      message: 'order updated successfully'
    })
  } catch (err) {
    next(err)
  }
}

export { createOrder, getAllOrders, updateOrder }

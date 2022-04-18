import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.createOrder(req.body)
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
    const order = await orderModel.updateOrder(req.body)
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

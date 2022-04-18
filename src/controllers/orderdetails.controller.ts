import { NextFunction, Request, Response } from 'express'
import OrderdetailsModel from '../models/orderdetails.model'

const orderdetailsModel = new OrderdetailsModel()

const createOrderdetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderdetails = await orderdetailsModel.createOrderdetails(req.body)
    res.json({
      status: 'success',
      data: { ...orderdetails },
      message: 'orderdetails created successfully'
    })
  } catch (err) {
    next(err)
  }
}

const getAllOrderdetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderdetails = await orderdetailsModel.getAllOrderdetails()
    res.json({
      status: 'success',
      data: { orderdetails },
      message: 'orderdetails retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}

const updateOrderdetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderdetails = await orderdetailsModel.updateOrderdetails(req.body)
    res.json({
      status: 'success',
      data: { ...orderdetails },
      message: 'orderdetails updated successfully'
    })
  } catch (err) {
    next(err)
  }
}

const deleteOrderdetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderdetails = await orderdetailsModel.deleteOrderdetails(req.body)
    res.json({
      status: 'success',
      data: { ...orderdetails },
      message: 'orderdetails deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}

export { createOrderdetails, getAllOrderdetails, updateOrderdetails, deleteOrderdetails }

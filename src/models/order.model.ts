/* eslint-disable no-useless-catch */

import Order from '../types/order.type'
import dbclient from '../db/db'

class OrderModel {
  async createOrder(newOrder: Order): Promise<Order> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to insert new order
      const createOrderQuery = `INSERT INTO orders(userid, status) VALUES($1, $2)
                        RETURNING id,userid,status`
      const result = await connection.query(createOrderQuery, [newOrder.userid, newOrder.status])
      //close connection
      connection.release()
      //return order
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // get all orders
  async getAllOrders(): Promise<Order[]> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to get all orders
      const getAllOrdersQuery = `SELECT id, userid, status FROM orders`
      const result = await connection.query(getAllOrdersQuery)
      //close connection
      connection.release()
      //return orders
      return result.rows
    } catch (err) {
      throw err
    }
  }
  // update order
  async updateOrder(newOrder: Order): Promise<Order> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to update order
      const updateOrderQuery = `UPDATE orders SET userid = $1, status = $2 WHERE id = $3 RETURNING id,userid,status`
      const result = await connection.query(updateOrderQuery, [
        newOrder.userid,
        newOrder.status,
        newOrder.id
      ])
      //close connection
      connection.release()
      //return order
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default OrderModel

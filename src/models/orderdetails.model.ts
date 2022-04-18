/* eslint-disable no-useless-catch */

import Orderdetails from '../types/orderdetails.type'
import dbclient from '../db/db'

class OrderdetailsModel {
  async createOrderdetails(newOrderdetails: Orderdetails): Promise<Orderdetails> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to insert new orderdetails
      const createOrderdetailsQuery = `INSERT INTO orderdetails(orderid, productid, quantity) VALUES($1, $2, $3)
                          RETURNING id,orderid,productid,quantity`
      const result = await connection.query(createOrderdetailsQuery, [
        newOrderdetails.orderid,
        newOrderdetails.productid,
        newOrderdetails.quantity
      ])
      //close connection
      connection.release()
      //return orderdetails
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // get all orderdetails
  async getAllOrderdetails(): Promise<Orderdetails[]> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to get all orderdetails
      const getAllOrderdetailsQuery = `SELECT id, orderid, productid, quantity FROM orderdetails`
      const result = await connection.query(getAllOrderdetailsQuery)
      //close connection
      connection.release()
      //return orderdetails
      return result.rows
    } catch (err) {
      throw err
    }
  }
  // update orderdetails
  async updateOrderdetails(newOrderdetails: Orderdetails): Promise<Orderdetails> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to update orderdetails
      const updateOrderdetailsQuery = `UPDATE orderdetails SET orderid = $1, productid = $2, quantity = $3 WHERE id = $4 RETURNING id,orderid,productid,quantity`
      const result = await connection.query(updateOrderdetailsQuery, [
        newOrderdetails.orderid,
        newOrderdetails.productid,
        newOrderdetails.quantity,
        newOrderdetails.id
      ])
      //close connection
      connection.release()
      //return orderdetails
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // delete orderdetails
  async deleteOrderdetails(id: number): Promise<Orderdetails> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to delete orderdetails
      const deleteOrderdetailsQuery = `DELETE FROM orderdetails WHERE id = $1 RETURNING id,orderid,productid,quantity`
      const result = await connection.query(deleteOrderdetailsQuery, [id])
      //close connection
      connection.release()
      //return orderdetails
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default OrderdetailsModel

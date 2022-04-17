/* eslint-disable no-useless-catch */

import Product from '../types/product.type'
import dbclient from '../db/db'

class ProductModel {
  async createProduct(newProduct: Product): Promise<Product> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to insert new product
      const createProductQuery = `INSERT INTO products(name, price) VALUES($1, $2)
                  RETURNING id,name,price`
      const result = await connection.query(createProductQuery, [newProduct.name, newProduct.price])
      //close connection
      connection.release()
      //return product
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to get all products
      const getAllProductsQuery = `SELECT id, name, price FROM products`
      const result = await connection.query(getAllProductsQuery)
      //close connection
      connection.release()
      //return products
      return result.rows
    } catch (err) {
      throw err
    }
  }
  // get a product by id
  async getProductById(id: number): Promise<Product> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to get product by id
      const getProductByIdQuery = `SELECT * FROM products WHERE id = $1`
      const result = await connection.query(getProductByIdQuery, [id])
      //close connection
      connection.release()
      //return product
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // update a product
  async updateProduct(newProduct: Product): Promise<Product> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to update product
      const updateProductQuery = `UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING id,name,price`
      const result = await connection.query(updateProductQuery, [
        newProduct.name,
        newProduct.price,
        newProduct.id
      ])
      //close connection
      connection.release()
      //return product
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
  // delete a product
  async deleteProduct(id: number): Promise<Product> {
    try {
      //open connection with database
      const connection = await dbclient.connect()
      //run query to delete product
      const deleteProductQuery = `DELETE FROM products WHERE id = $1 RETURNING id,name,price`
      const result = await connection.query(deleteProductQuery, [id])
      //close connection
      connection.release()
      //return product
      return result.rows[0]
    } catch (err) {
      throw err
    }
  }
}

export default ProductModel

import supertest from 'supertest'
import dbclient from '../../db/db'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const productModel = new ProductModel()
const userModel = new UserModel()
const request = supertest(app)
const user = {
  email: 'ahmed@gmail.com',
  password: 'password'
}
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string)

describe('Product api endpoints', () => {
  const product = {
    name: 'Tshirt',
    price: 150.5
  } as Product

  afterAll(async () => {
    const connection = await dbclient.connect()
    // alter sequence id to 1
    await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1')
    await connection.query('DELETE FROM products;')
    connection.release()
  })

  describe('Test Product methods', () => {
    it('should create a product', async () => {
      const res = await request
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          name: product.name,
          price: product.price
        })
      expect(res.status).toBe(200)
      const { id, name, price } = res.body.data
      expect(name).toBe(product.name)
      expect(price).toBe(product.price)
      expect(id).toBeDefined()
    })

    it('should get all products', async () => {
      const res = await request.get('/api/products').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.products.length).toBe(1)
    })

    it('should get a product', async () => {
      const res = await request.get('/api/products/1').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      const { id, name, price } = res.body.data
      expect(name).toBe(product.name)
      expect(price).toBe(product.price)
      expect(id).toBeDefined()
    })

    it('should update a product', async () => {
      const res = await request
        .put('/api/products/1')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/json')
        .send({
          id: 1,
          name: 'Tshirt',
          price: 550.5
        })
      expect(res.status).toBe(200)
      const { id, name, price } = res.body.data
      expect(name).toBe('Tshirt')
      expect(price).toBe(550.5)
      expect(id).toBeDefined()
    })

    it('should delete a product', async () => {
      const res = await request.delete('/api/products/1').set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      const { id, name, price } = res.body.data
      expect(name).toBe('Tshirt')
      expect(price).toBe(550.5)
      expect(id).toBeDefined()
    })
  })
})

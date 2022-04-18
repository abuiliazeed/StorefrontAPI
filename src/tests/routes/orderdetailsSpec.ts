import supertest from 'supertest'
import dbclient from '../../db/db'
import app from '../../index'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import Orderdetails from '../../types/orderdetails.type'
import OrderdetailsModel from '../../models/orderdetails.model'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'

dotenv.config()

const request = supertest(app)
const orderModel = new OrderModel()
const orderdetailsModel = new OrderdetailsModel()
const productModel = new ProductModel()
const userModel = new UserModel()

const user = {
    email: 'ahmed@gmail.com',
    password: 'password'
}
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string)

describe('orderdetails api routes test', () => {
    const product1 = {
        name: 'product1',
        price: 100
    } as Product

    const product2 = {
        name: 'product2',
        price: 200
    } as Product

    const user1 = {
        email: 'user1@gmail.com',
        firstname: 'Don',
        lastname: 'Joe',
        password: 'password'
    } as User

    const user2 = {
        email: 'user2@gmail.com',
        firstname: 'boo',
        lastname: 'far',
        password: 'password'
    } as User

    const order1 = {
        userid: 1,
        status: 'active'
    } as Order
    const order2 = {
        userid: 2,
        status: 'completed'
    } as Order

    const orderdetails1 = {
        orderid: 1,
        productid: 1,
        quantity: 2
    } as Orderdetails
    const orderdetails2 = {
        orderid: 1,
        productid: 2,
        quantity: 4
    } as Orderdetails

    beforeAll(async () => {
        const connection = await dbclient.connect()
        // alter sequence id to 1
        await connection.query('ALTER SEQUENCE orderdetails_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM orderdetails;')
        connection.release()

        const createdUser1 = await userModel.createUser(user1)
        user1.id = createdUser1.id

        const createdUser2 = await userModel.createUser(user2)
        user2.id = createdUser2.id

        const createdOrder1 = await orderModel.createOrder(order1)
        order1.id = createdOrder1.id

        const createdOrder2 = await orderModel.createOrder(order1)
        order2.id = createdOrder2.id

        const createdProduct1 = await productModel.createProduct(product1)
        product1.id = createdProduct1.id

        const createdProduct2 = await productModel.createProduct(product2)
        product2.id = createdProduct2.id

        const createdOrderdetails1 = await orderdetailsModel.createOrderdetails(orderdetails1)
        orderdetails1.id = createdOrderdetails1.id
    })
    afterAll(async () => {
        const connection = await dbclient.connect()
        // alter sequence id to 1
        await connection.query('ALTER SEQUENCE orderdetails_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM orderdetails;')
        await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM orders;')
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM products;')
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM users;')
        connection.release()
    })
    
    // test get all orderdetails
    it('should get all orderdetails', async () => {
        const response = await request.get('/api/orderdetails').set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    }
    )
    // test create orderdetails
    it('should create orderdetails', async () => {
        const response = await request.post('/api/orderdetails').set('Authorization', `Bearer ${token}`).send(orderdetails2)
        expect(response.status).toBe(200)
        
    }
    )
    // test update orderdetails
    it('should update orderdetails', async () => {
        const response = await request.put('/api/orderdetails/1').set('Authorization', `Bearer ${token}`).send(orderdetails2)
        expect(response.status).toBe(200)
    }
    )
})

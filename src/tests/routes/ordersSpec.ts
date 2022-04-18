import supertest from 'supertest'
import dbclient from '../../db/db'
import app from '../../index'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'


dotenv.config()

const request = supertest(app)
const userModel = new UserModel()
const orderModel = new OrderModel()

const user = {
    email: 'ahmed@gmail.com',
    password: 'password'
}
const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string)

describe('Orders api routes test', () => {
    const user1 = {
        email: 'jon@gmail.com',
        firstname: 'jon',
        lastname: 'Joe',
        password: 'password'
    } as User

    const user2 = {
        email: 'bon@gmail.com',
        firstname: 'bon',
        lastname: 'far',
        password: 'password'
    } as User

    const order1 = {
        userid: 1,
        status: 'order1 active'
    } as Order
    const order2 = {
        userid: 2,
        status: 'order2 completed'
    } as Order
    beforeAll(async () => {
        const createdUser1 = await userModel.createUser(user1)
        user1.id = createdUser1.id

        const createdUser2 = await userModel.createUser(user2)
        user2.id = createdUser2.id

        const createdOrder = await orderModel.createOrder(order1)
        order1.id = createdOrder.id
    })
    afterAll(async () => {
        const connection = await dbclient.connect()
        // alter sequence id to 1
        await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM orders;')
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
        await connection.query('DELETE FROM users;')        
        connection.release()
    })

    describe('Test Orders endpoints', () => {
        it('should create a new order', async () => {
            const res = await request
                .post('/api/orders')
                .set('Authorization', `Bearer ${token}`)
                .send(order2)
            expect(res.status).toBe(200)
        })
        it('should get all orders', async () => {
            const res = await request
                .get('/api/orders')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
        })
        it('should update an order', async () => {
            const res = await request
                .put(`/api/orders/${order1.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({ 
                    id:1,
                    userid: 1,
                    status: 'order1 completed'})
            expect(res.status).toBe(200)
        })
    })
})
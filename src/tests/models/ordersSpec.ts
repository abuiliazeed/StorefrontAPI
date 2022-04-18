import OrderModel from '../../models/order.model'
import dbclient from '../../db/db'
import Order from '../../types/order.type'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'

const userModel = new UserModel()
const orderModel = new OrderModel()

describe('Order Model', () => {
    describe('Order Method exists', () => {
        it('should have a get orders method', () => {
            expect(orderModel.getAllOrders).toBeDefined()
        }
        )
        it('should have a create order method', () => {
            expect(orderModel.createOrder).toBeDefined()
        }
        )
        it('should have update order method', () => {
            expect(orderModel.updateOrder).toBeDefined()
        }
        )
    })
    describe('Test order model logic', () => {
        const user1 = {
            email: 'Don@gmail.com',
            firstname: 'Don',
            lastname: 'Joe',
            password: 'password'
          } as User

          const user2 = {
            email: 'boo@gmail.com',
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
        // Testing create method
        it('Create method should return a New Order', async () => {
            
            const createdOrder = await orderModel.createOrder(order2)
            order2.id = createdOrder.id
            expect(createdOrder.id).toBeDefined()
        })

        // Testing get all orders method
        it('should return all orders', async () => {
            const orders = await orderModel.getAllOrders()
            expect(orders.length).toBeGreaterThan(0)
        })

        // Testing update order method
        it('Update method should return an updated order', async () => {
            const updatedOrder = await orderModel.updateOrder({
                userid: user1.id,
                status: 'completed',
                id: order1.id
            }  as Order)
            expect(updatedOrder).toEqual({
                id: updatedOrder.id,
                userid: user1.id,
                status: 'completed'
            }  as Order)
        })
    })})
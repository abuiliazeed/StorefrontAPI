import OrderModel from '../../models/order.model'
import Orderdetails from '../../types/orderdetails.type'
import OrderdetailsModel from '../../models/orderdetails.model'
import dbclient from '../../db/db'
import Order from '../../types/order.type'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'

const orderModel = new OrderModel()
const orderdetailsModel = new OrderdetailsModel()
const productModel = new ProductModel()
const userModel = new UserModel()


describe('orderdetails Model', () => {
    describe('orderdetails Method exists', () => {
        it('should have a get orderdetails method', () => {
            expect(orderdetailsModel.getAllOrderdetails).toBeDefined()
        }
        )
        it('should have a create orderdetails method', () => {
            expect(orderdetailsModel.createOrderdetails).toBeDefined()
        }
        )
        it('should have update orderdetails method', () => {
            expect(orderdetailsModel.updateOrderdetails).toBeDefined()
        })

        describe('Test orderdetails model logic', () => {
            const product1 = {
                name: 'product1',
                price: 100
            } as Product

            const product2 = {
                name: 'product2',
                price: 200
            } as Product

            const user1 = {
                email: 'jon@gmail.com',
                firstname: 'Don',
                lastname: 'Joe',
                password: 'password'
            } as User

            const user2 = {
                email: 'bon@gmail.com',
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
                connection.release()
            })
            // Testing create method
            it('should create a orderdetails', async () => {
                const createdOrderdetails2 = await orderdetailsModel.createOrderdetails(orderdetails2)
                orderdetails2.id = createdOrderdetails2.id
                expect(createdOrderdetails2.id).toBe(2)
            }
            )
            // Testing get all orderdetails method
            it('should get all orderdetails', async () => {
                const orderdetails = await orderdetailsModel.getAllOrderdetails()
                expect(orderdetails).toEqual([
                    {
                        id: 1,
                        orderid: 1,
                        productid: 1,
                        quantity: 2
                    },
                    {
                        id: 2,
                        orderid: 1,
                        productid: 2,
                        quantity: 4
                    }
                ])
            }
            )
            // Testing update orderdetails method
            it('should update a orderdetails', async () => {
                const updatedOrderdetails = await orderdetailsModel.updateOrderdetails({
                    orderid: 1,
                    productid: 1,
                    quantity: 3,
                    id: orderdetails1.id
                } as Orderdetails)
                expect(updatedOrderdetails).toEqual({
                    id: updatedOrderdetails.id,
                    orderid: 1,
                    productid: 1,
                    quantity: 3
                } as Orderdetails)
            })

        })
    })


})
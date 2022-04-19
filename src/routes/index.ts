import { Router } from 'express'
import userRoutes from './api/users.routes'
import productRoutes from './api/products.routes'
import orderRoutes from './api/orders.routes'
import orderdetailsRoutes from './api/orderdetails.routes'

const routes = Router()
// we use the users routes
routes.use('/users', userRoutes)
// we use the products routes
routes.use('/products', productRoutes)
// we use the orders routes
routes.use('/orders', orderRoutes)
// we use the orderdetails route
routes.use('/orderdetails', orderdetailsRoutes)

export default routes

import { Router } from 'express'
import userRoutes from './api/users.routes'
import productRoutes from './api/products.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/products', productRoutes)

export default routes

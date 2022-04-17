import { Router, Request, Response } from 'express'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser
} from '../../controllers/user.controllers'
import authenticationMiddleware from '../../middleware/authenticate.middleware'

const userRoutes = Router()
//create user route
userRoutes.post('/', createUser)
//get all users route
userRoutes.get('/', authenticationMiddleware, getAllUsers)
//get user by id route
userRoutes.get('/:id', authenticationMiddleware, getUserById)
//update user route
userRoutes.put('/:id', authenticationMiddleware, updateUser)
//delete user route
userRoutes.delete('/:id', authenticationMiddleware, deleteUser)
//authenticate user route
userRoutes.post('/authenticate', authenticateUser)

export default userRoutes

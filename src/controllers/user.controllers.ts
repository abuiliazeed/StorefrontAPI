import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const userModel = new UserModel()

// create user function
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the data sent in the request body and passing it to the create user model function
    const user = await userModel.createUser(req.body)
    // returning the user created
    res.json({
      status: 'success',
      data: { ...user },
      message: 'user created successfully'
    })
  } catch (err) {
    next(err)
  }
}
// get all users function
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getAllUsers()
    // returning all users
    res.json({
      status: 'success',
      data: { users },
      message: 'users retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}
// get user by id function
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the user id from the request params
    const user = await userModel.getUserById(Number(req.params.id))
    // returning the user
    res.json({
      status: 'success',
      data: { ...user },
      message: 'user retrieved successfully'
    })
  } catch (err) {
    next(err)
  }
}
// update a user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the user data that we want to update from the request body
    const user = await userModel.updateUser(req.body)
    // returning the user updated
    res.json({
      status: 'success',
      data: user,
      message: 'user updated successfully'
    })
  } catch (err) {
    next(err)
  }
}

//delete a user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the user id from the request params
    const user = await userModel.deleteUser(Number(req.params.id))
    // returning the user deleted
    res.json({
      status: 'success',
      data: user,
      message: 'user deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}

// authenticate user
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fetching the user email and password from the request body
    const user = await userModel.authenticateUser(req.body.email, req.body.password)
    //generating a token based on the user data retrieved
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string)
    // if the user gave the wrong credentials we return an error
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'invalid credentials'
      })
      // if the user gave us the right credintials we return the user in addition to the token
    } else {
      res.json({
        status: 'success',
        data: { ...user, token },
        message: 'user authenticated successfully'
      })
    }
  } catch (err) {
    next(err)
  }
}

export { createUser, getAllUsers, getUserById, updateUser, deleteUser, authenticateUser }
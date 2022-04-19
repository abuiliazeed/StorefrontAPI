import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Error from '../interfaces/error.interface'

dotenv.config()
// this function to display the error message
const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error: Please try again ')
  error.status = 401
  next(error)
}

const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // we get the authorization from the request
    const authHeader = req.get('Authorization')

    // check authHeader validate
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLocaleLowerCase()
      const token = authHeader.split(' ')[1]
      // we check if it's a bearer token or not
      if (token && bearer === 'bearer') {
        // verify token using the token secret from our environment variable
        const decoded = jwt.verify(token, String(process.env.TOKEN_SECRET))
        if (decoded) {
          next()
        } else {
          handleUnauthorizedError(next)
        }
      }
    } else {
      handleUnauthorizedError(next)
    }

  } catch (error) {
    handleUnauthorizedError(next)
  }
}

export default validateTokenMiddleware

import UserModel from '../../models/user.model'
import dbclient from '../../db/db'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Module', () => {
  describe('Test Methods Exists', () => {
    it('should have a method to authenticate a user', () => {
      expect(userModel.authenticateUser).toBeDefined()
    })
  })

  describe('Test Authentication Logic', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password'
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.createUser(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      const connection = await dbclient.connect()
      // alter sequence id to 1
      await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
      await connection.query('DELETE FROM users;')
      connection.release()
    })

    it('should authenticate a user', async () => {
      const authenticatedUser = await userModel.authenticateUser(user.email, user.password)
      expect(authenticatedUser?.email).toBe(user.email)
      expect(authenticatedUser?.firstname).toBe(user.firstname)
      expect(authenticatedUser?.lastname).toBe(user.lastname)
    })

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticateUser(
        'hamada@hamada.com',
        'wrongpassword'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})

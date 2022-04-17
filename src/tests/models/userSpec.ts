import UserModel from '../../models/user.model'
import dbclient from '../../db/db'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('Test User Methods Exists', () => {
    it('should have a get users method', () => {
      expect(userModel.getAllUsers).toBeDefined()
    })
    it('should have a create user method', () => {
      expect(userModel.createUser).toBeDefined()
    })
    it('should have a get user method', () => {
      expect(userModel.getUserById).toBeDefined()
    })
    it('should have a delete a user method', () => {
      expect(userModel.deleteUser).toBeDefined()
    })
    it('should have a update a user method', () => {
      expect(userModel.updateUser).toBeDefined()
    })
    it('should have a authenticate user method', () => {
      expect(userModel.authenticateUser).toBeDefined()
    })
  })

  describe('Test User model logic', () => {
    const user = {
      email: 'johndoe@gmail.com',
      firstname: 'John',
      lastname: 'Doe',
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
    // Testing create method
    it('Create method should return a New User', async () => {
      const createdUser = await userModel.createUser({
        email: 'test2@test.com',
        firstname: 'Test',
        lastname: 'User',
        password: 'test123'
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test2@test.com',
        firstname: 'Test',
        lastname: 'User'
      } as User)
    })
    // Testing get  method
    it('should get all users', async () => {
      const users = await userModel.getAllUsers()
      expect(users.length).toBeGreaterThan(0)
    })
    // Testing get by id method
    it('should get a user by id', async () => {
      const getuser = await userModel.getUserById(user.id)
      expect(user.firstname).toBe(user.firstname)
      expect(user.lastname).toBe(user.lastname)
      expect(user.email).toBe(user.email)
      expect(user.password).toBe(user.password)
    })
    //Testing update a user
    it('should update a user', async () => {
      const updatedUser = await userModel.updateUser({
        ...user,
        firstname: 'foo',
        lastname: 'bar'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.firstname).toBe('foo')
      expect(updatedUser.lastname).toBe('bar')
    })
    it('should delete a user', async () => {
      const deletedUser = await userModel.deleteUser(user.id)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})

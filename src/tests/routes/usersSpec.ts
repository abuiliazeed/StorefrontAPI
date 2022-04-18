import supertest from 'supertest'
import dbclient from '../../db/db'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User api endpoints', () => {
  const user = {
    email: 'john@doe.com',
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

  describe('Test Authentication Methods', () => {
    it('should authenticate and get a token ', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'john@doe.com',
          password: 'password'
        })
      expect(res.status).toBe(200)
      const { id, email, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe('john@doe.com')
      token = userToken
    })
    it('should not authenticate a user with wrong credentials', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'doe@john.com',
          password: 'password'
        })
      expect(res.status).toBe(401)
    })
  })

  describe('Test User CRUD Methods', () => {
    it('should create a user', async () => {
      const res = await request
        .post('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'folan@folany.com',
          firstname: 'Folan',
          lastname: 'Folany',
          password: 'password'
        } as User)
      expect(res.status).toBe(200)
      const { id, email, firstname, lastname } = res.body.data
      expect(email).toBe('folan@folany.com')
      expect(firstname).toBe('Folan')
      expect(lastname).toBe('Folany')
    })
    it('should get all users', async () => {
      const res = await request
        .get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.data.users.length).toBeGreaterThan(0)
    })

    it('should get a user', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      const { email, firstname, lastname } = res.body.data
      expect(email).toBe('john@doe.com')
      expect(firstname).toBe('John')
      expect(lastname).toBe('Doe')
    })

    it('should update a user', async () => {
      const res = await request
        .put(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          firstname: 'foo',
          lastname: 'bar'
        })
      expect(res.status).toBe(200)
      const { id, email, firstname, lastname } = res.body.data
      expect(firstname).toBe('foo')
      expect(lastname).toBe('bar')
    })

    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(user.id)
    })
  })
})

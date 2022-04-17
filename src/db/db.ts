import pg, { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  ENV,
  BYCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env

let dbclient: Pool = new Pool()

if (ENV === 'test') {
  dbclient = new pg.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT)
  })
} else {
  dbclient = new pg.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT)
  })
}

dbclient.on('error', (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error.message)
})

export default dbclient

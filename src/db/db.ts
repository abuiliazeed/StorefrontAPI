import pg, { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()
// we fetch all the environment variables from the .env file utilizing the dotenv package
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

// if we choose the testing environment the dbclient will connect to the testing database
if (ENV === 'test') {
  dbclient = new pg.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT)
  })
  // if we choose the dev environment the dbclient will connect with the development database
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

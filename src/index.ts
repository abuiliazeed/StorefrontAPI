import express, { Application, Request, Response, json } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import dbclient from './db/db'
import routes from './routes/index'
import errorMiddleWare from './middleware/error.middleware'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))

dbclient.connect().then((client) => {
  client.query('SELECT NOW()', (err, res) => {
    console.log(`Environment: ${process.env.ENV} Database connected at:`)
    console.log(res.rows)
    client.release()
  })
})

app.use(express.json())
app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'server is running'
  })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found'
  })
})
app.use(errorMiddleWare)
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app

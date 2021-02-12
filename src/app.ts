/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HandlerController } from './controllers/user/user'
import { UserServices } from './services/users'

const app = express()
const port = process.env.PORT ?? 3000

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
})

const makeUserHandler = (): HandlerController => {
  const userServices = new UserServices()
  const userHandler = new HandlerController(userServices)
  return userHandler
}

const userHandler = makeUserHandler()

app.get('/', (req, res) => res.send('Github API'))

app.get('/api/users', async (req, res) => {
  const { statusCode, body } = await userHandler.listAll(req)
  res.status(statusCode).json(body)
})

app.get('/api/users/:username/details', async (req, res) => {
  const { statusCode, body } = await userHandler.details(req)
  res.status(statusCode).json(body)
})

app.get('/api/users/:username/repos', async (req, res) => {
  const { statusCode, body } = await userHandler.repositories(req)
  res.status(statusCode).json(body)
})

app.listen(port, () => {
  console.log(`Hosting at @${port}`)
})

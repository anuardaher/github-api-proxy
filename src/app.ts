/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HandlerController } from './controllers/signup/signup'
import { UserServices } from './services/users'

const app = express()
const port = 3000

const makeHandler = (): HandlerController => {
  const userServices = new UserServices()
  const handler = new HandlerController(userServices)
  return handler
}

const handler = makeHandler()

app.get('/', (req, res) => res.send('Shaw and Partners Github API'))

app.get('/api/users', async (req, res) => {
  const { statusCode, body } = await handler.listAll(req)
  res.status(statusCode).json(body)
})

app.get('/api/users/:username/details', async (req, res) => {
  const { statusCode, body } = await handler.details(req)
  res.status(statusCode).json(body)
})

app.get('/api/users/:username/repos', async (req, res) => {
  const { statusCode, body } = await handler.repositories(req)
  res.status(statusCode).json(body)
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

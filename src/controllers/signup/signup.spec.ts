import { HandlerController } from './signup'
import { InvalidParamError } from '../../errors'
import { UserServices } from '../../services/users'
import { UserServicesInterface } from '../../protocols'

interface SutTypes {
  sut: HandlerController
  service: UserServicesInterface
}

const makeSut = (): SutTypes => {
  const service = makeService()
  const sut = new HandlerController(service)
  return {
    sut,
    service
  }
}

const makeService = (): UserServicesInterface => {
  const service = new UserServices()
  return service
}

describe('Github user services', () => {
  test('should return 400 if since querystring is invalid', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        since: 'invalid'
      }
    }
    const httpResponse = await sut.listAll(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('since'))
  })

  test('should return 400 if username param is missing from details service', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        username: ''
      }
    }
    const httpResponse = await sut.details(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('username'))
  })

  test('should return 400 if username param is missing from repositorie service', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        username: ''
      }
    }
    const httpResponse = await sut.repositories(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('username'))
  })
})

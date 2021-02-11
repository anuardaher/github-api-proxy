import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Controller, httpRequest, httpResponse } from './signup-protocols'
import { InvalidParamError } from '../../errors'
import parse from 'parse-link-header'

export class HandlerController implements Controller {
  private readonly service

  constructor (service: any) {
    this.service = service
  }

  async listAll (req: httpRequest): Promise<httpResponse> {
    try {
      const since = req.query.since ?? '0'
      if (isNaN(since)) return badRequest(new InvalidParamError('since'))
      const { data, headers } = await this.service.all(since)
      if (!data) return serverError()
      if (!headers.link) return serverError()
      const parsed = parse(headers.link)
      return ok({ data, pagination: parsed })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }

  async details (req: httpRequest): Promise<httpResponse> {
    try {
      const username: string = req.params.username.toString() ?? ''
      if (!username) return badRequest(new InvalidParamError('username'))
      const { data } = await this.service.details(username)
      if (!data) return serverError()
      return ok(data)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }

  async repositories (req: httpRequest): Promise<httpResponse> {
    try {
      const username: string = req.params.username.toString() ?? ''
      if (!username) return badRequest(new InvalidParamError('username'))
      const { data } = await this.service.repositories(username)
      if (!data) return serverError()
      return ok(data)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

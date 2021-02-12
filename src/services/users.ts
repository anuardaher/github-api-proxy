import axios from 'axios'
import { UserServicesInterface } from '../protocols/'

export class UserServices implements UserServicesInterface {
  service: any

  constructor () {
    const service = axios.create({
      baseURL: 'https://api.github.com/users',
      headers: { Accept: 'application/json' }
    })
    this.service = service
  }

  async all (since: string): Promise<any> {
    return this.service.get('', { params: { since } })
  }

  async details (username: string): Promise<any> {
    return this.service.get(`/${username}`)
  }

  async repositories (username: string): Promise<any> {
    return this.service.get(`/${username}/repos`)
  }
}

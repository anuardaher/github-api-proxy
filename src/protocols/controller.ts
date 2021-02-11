
import { httpRequest, httpResponse } from '../protocols/http'
export interface Controller {
  listAll (httpRequest: httpRequest): Promise<httpResponse>
  details (httpRequest: httpRequest): Promise<httpResponse>
  repositories (httpRequest: httpRequest): Promise<httpResponse>
}

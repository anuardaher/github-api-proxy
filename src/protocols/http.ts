export interface httpResponse {
  statusCode: number
  body: any
}

export interface httpRequest {
  body?: any
  query?: any
  params?: any
}

export interface UserServicesInterface {
  service: any

  all(since: string): Promise<any>
  details(username: string): Promise<any>
  repositories(username: string): Promise<any>
}

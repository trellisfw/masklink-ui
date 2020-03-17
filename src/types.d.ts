declare module '@trellisfw/signatures' {
  export function hashJSON (obj: object): { hash: string; alg: 'SHA256' }
}

declare module '@oada/oada-id-client/index' {
  import { AxiosRequestConfig, AxiosResponse } from 'axios'

  export const browser = {
    getAccessToken (
      url: string,
      opts: any,
      callback: (err: any, result?: { access_token: any }) => void
    )
  }

  export interface OADARequestConfig extends AxiosRequestConfig {
    contentType?: string
  }

  export interface OADAResponse extends AxiosResponse {}
}

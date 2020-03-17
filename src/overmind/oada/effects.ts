import _websocket from './websocket'
import { AxiosRequestConfig } from 'axios'
var myWebsocket: any = null

export const websocket = {
  connect: async (url: string): Promise<void> => {
    //Connect to OADA with this url
    const ws = await _websocket(url)
    myWebsocket = ws
  },
  watch (request: AxiosRequestConfig, callback: (arg: any) => any) {
    return myWebsocket?.watch(request, callback)
  },
  http (request: AxiosRequestConfig) {
    return myWebsocket.http(request).catch((err: any) => {
      if (err.response && err.response.status) {
        if (err.response.status === 404) {
          console.log('HTTP 404', err?.response?.headers?.['content-location'])
        } else if (err.response.status === 403) {
          console.log('HTTP 403', err?.response?.headers?.['content-location'])
        } else {
          console.log('HTTP Error: ', err)
        }
      } else {
        console.log('HTTP Error', err)
      }
    })
  },
  close () {
    if (myWebsocket) {
      console.log('Closing web socket...')
      return myWebsocket.close()
    }
    console.log('WARNING: tried to close a null websocket!')
  }
}

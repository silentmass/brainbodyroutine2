import { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const API_URL = 'http://127.0.0.1:8000' // The actual URL of your API

const proxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false
  }
}

export const proxyFunction = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  return new Promise<void>((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, err => {
      if (err) {
        return reject(err)
      }
      resolve()
    })
  })
}

export default proxyFunction

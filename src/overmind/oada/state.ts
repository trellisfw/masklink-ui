import signed from '../../config/dev-cert/signed_software_statement.js'
import unsigned from '../../config/dev-cert/unsigned_software_statement.js'

export type State = {
  token: string
  data: {
    documents: { [key: string]: any }
  }
  url: string
  devcert: string
  redirect: string
}

export const state: State = {
  token: '',
  data: {
    documents: {}
  },
  url: 'https://localhost',
  devcert: signed, // Don't use this public one in production unless implicit flow is OK for you
  redirect:
    unsigned.redirect_uris[process.env.NODE_ENV === 'production' ? 1 : 0] // 0 is localhost:3000, 1 is trellisfw.github.io/conductor
}

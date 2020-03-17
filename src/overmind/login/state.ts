import { Derive } from 'overmind'
import { Config } from '../'

type State = {
  domain: Derive<Config['state'], string>
  loggedIn: boolean
  name: string | null
  loading: boolean
  error: string | null
}

export const state: State = {
  domain: (_, state) => state.oada.url,
  loggedIn: false,
  name: null,
  loading: false,
  error: null
}

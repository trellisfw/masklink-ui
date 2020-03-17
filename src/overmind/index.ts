import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'
import { merge, namespaced } from 'overmind/config'

import { state } from './state'
import { onInitialize } from './onInitialize'
import * as actions from './actions'
import * as oada from './oada'
import * as urls from './urls'
import * as view from './view'
import * as login from './login'

export const config = merge(
  {
    state,
    onInitialize,
    actions
  },
  namespaced({
    oada,
    urls,
    view,
    login
  })
)

export type Config = typeof config

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export default createHook<typeof config>()

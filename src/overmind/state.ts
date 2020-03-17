import { Derive } from 'overmind'
import { parse } from 'query-string'

import { hashJSON } from '@trellisfw/signatures'

// "trellis-mask" type
export type Mask = {
  version: '1.0'
  hashinfo: { alg: 'SHA256'; hash: string }
  // URL
  original: string
}

// Parse query parameters
const { 'trellis-mask': maskstr } = parse(window.location.search)
const mask: Mask = JSON.parse(
  (Array.isArray(maskstr) ? maskstr[0] : maskstr) || '{}'
)

export enum Validity {
  Invalid = 0,
  Valid = 1,
  Unknown = 'unknown'
}

export type Skin = {
  loginBackground: string
  logo: {
    src: string
    height: number
  }
}

// TODO: How to describe oada resources??
type OADADoc = {
  [key: string]: string | number | OADADoc | OADADoc[]
}

export type State = {
  count: number
  mask: Mask
  original: OADADoc | null
  vdoc: OADADoc | null
  hash: Derive<State, string | null>
  valid: Derive<State, Validity>
  skin: string
  skins: {
    [key: string]: Skin
  }
}

const skins = ['default']
  .map(skin => ({
    [skin]: require(`../../public/skins/${skin}/config`)
  }))
  .reduce((o, n) => Object.assign(o, n))

export const state: State = {
  count: 0,
  mask,
  original: null,
  vdoc: null,
  hash: state => state.original && hashJSON(state.original).hash,
  valid: state =>
    state.original
      ? +(state.hash === state.mask.hashinfo.hash)
      : Validity.Unknown,
  skin: 'default',
  skins
}

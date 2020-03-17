import { Action, AsyncAction } from 'overmind'

import axios from 'axios'

export const fetchLink: AsyncAction<string> = async (
  { state, actions },
  url: string
) => {
  let data
  try {
    ;({ data } = await axios.get(url))
  } catch {
    try {
      ;({ data } = await actions.oada.get(url))
    } catch {
      state.original = null
    }
  }
  state.original = data
}

export const increaseCount: Action = ({ state }, test) => {
  console.log('test', test)
  state.count++
}
export const decreaseCount: Action = ({ state }) => {
  state.count--
}

export const skinChange: Action<string> = ({ state }, newSkin) => {
  state.skin = newSkin
  // Save this to localStorage to keep for next time:
  window.localStorage['skin'] = newSkin
}

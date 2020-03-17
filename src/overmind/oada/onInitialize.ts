import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = async ({ state }) => {
  // Populate domain from localStorage if there is a saved one:
  if (window.localStorage['oada:domain']) {
    console.log('Have saved domain in localStorage, using it')
    state.oada.url = window.localStorage['oada:domain']
  }
}

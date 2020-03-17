import { OnInitialize } from 'overmind'

export const onInitialize: OnInitialize = async ({ state, actions }) => {
  // Populate skin from localStorage if there is a saved one:
  if (window.localStorage['skin']) {
    console.log('Have saved skin in localStorage, using it')
    state.skin = window.localStorage['skin']
  }
  console.log('Using skin ', state.skin)

  // TODO: Does this go here??
  // log in to domain of mask original?
  const { host } = new URL(state.mask.original)
  actions.login.domainChange({ value: host })
  await actions.login.login()

  // TODO: Does this go here??
  // fetch original
  const { data: original } = await actions.oada.get(state.mask.original)
  state.original = original

  // TODO: Does this go here??
  // Fetch vdoc
  try {
    const { data: vdoc } = await actions.oada.get(
      `${state.mask.original}/_meta/vdoc/_id`
    )
    state.vdoc = vdoc

    const docs = state.oada.data.documents
    Object.keys(docs).some(id => {
      if (docs[id]._id === vdoc) {
        state.view.Modals.FileDetailsModal.documentKey = id
        return true
      }
      return false
    })
  } catch {}
}

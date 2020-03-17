import uuid from 'uuid/v4'
import Promise from 'bluebird'
import { AsyncAction, Action } from 'overmind'

const logout: AsyncAction = async ({ actions }) => {
  await actions.login.logout()
  await actions.oada.logout()
}
export const TopBar: { logout: AsyncAction } = {
  logout
}

const viewPDF: Action<string> = ({ state }, documentKey) => {
  state.view.Modals.PDFViewerModal.headers = {
    Authorization: 'Bearer ' + state.oada.token
  }
  state.view.Modals.PDFViewerModal.url = `${state.oada.url}/bookmarks/trellisfw/documents/${documentKey}/pdf`
  state.view.Modals.PDFViewerModal.open = true
}
const toggleShowData: Action = ({ state }) => {
  state.view.Modals.FileDetailsModal.showData = !state.view.Modals
    .FileDetailsModal.showData
}
const closeDetails: Action = ({ state }) => {
  //Close my window
  state.view.Modals.FileDetailsModal.open = false
}
const closePDF: Action = ({ state }) => {
  //Close my window
  state.view.Modals.PDFViewerModal.open = false
}
const closeValidity: Action = ({ state }) => {
  //Close my window
  state.view.Modals.ValidityModal.open = false
}
export const Modals = {
  FileDetailsModal: {
    viewPDF,
    toggleShowData,
    close: closeDetails
  },
  PDFViewerModal: {
    close: closePDF
  },
  ValidityModal: {
    close: closeValidity
  }
}

const filesDropped: AsyncAction<File[], any> = ({ state, actions }, files) => {
  //Start uploading the files
  return Promise.map(files, file => {
    //Add an `uploading` file
    const id = uuid()
    state.view.Pages.Data.uploading[id] = {
      filename: file.name
    }
    return actions.oada.uploadFile(file).then(() => {
      delete state.view.Pages.Data.uploading[id]
    })
  })
}
export const Pages = {
  Data: {
    Dropzone: {
      filesDropped
    }
  }
}

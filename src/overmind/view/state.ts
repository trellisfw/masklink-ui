import { Derive } from 'overmind'

type State = {
  Modals: {
    ValidityModal: {
      open: boolean
    }
    FileDetailsModal: {
      open: boolean
      documentKey: string | null
      showData: boolean
      audit: Derive<State['Modals']['FileDetailsModal'], {}>
      'audit-masked': Derive<State['Modals']['FileDetailsModal'], {}>
      coi: Derive<State['Modals']['FileDetailsModal'], {}>
    }
    PDFViewerModal: {
      open: boolean
      url: string | null
      headers: {
        [key: string]: string
      }
    }
  }
  Pages: {
    Data: {
      uploading: {
        [key: string]: {
          filename: string
        }
      }
    }
  }
}
export const state: State = {
  Modals: {
    FileDetailsModal: {
      open: false,
      documentKey: null,
      showData: false,
      audit: ({ documentKey }, state) => {
        //Get the audit from the doc
        const audits =
          documentKey && state.oada.data.documents?.[documentKey]?.audits
        return audits?.[Object.keys(audits)?.[0]]
      },
      'audit-masked': ({ documentKey }, state) => {
        //Get the audit from the doc
        const audits =
          documentKey &&
          state.oada.data.documents?.[documentKey]?.['audits-masked']
        return audits?.[Object.keys(audits)?.[0]]
      },
      coi: ({ documentKey }, state) => {
        //Get the cois from the doc
        const cois =
          documentKey && state.oada.data.documents?.[documentKey]?.cois
        return cois?.[Object.keys(cois)?.[0]]
      }
    },
    PDFViewerModal: {
      open: false,
      url: null,
      headers: {}
    },
    ValidityModal: {
      open: true
    }
  },
  Pages: {
    Data: {
      uploading: {}
    }
  }
}

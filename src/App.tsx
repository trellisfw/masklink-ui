import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import overmind from './overmind'

import TopBar from './view/TopBar'
import Pages from './view/Pages'
import PDFViewerModal from './view/Modals/PDFViewerModal'
import Login from './Login'
import ValidityModal from './view/Modals/ValidityModal'

const App: React.FunctionComponent = () => {
  const { state } = overmind()

  return state.login.loggedIn ? (
    <div
      css={css`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
      `}
    >
      <TopBar />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: stretch;
        `}
      >
        <Pages />
        <PDFViewerModal />
        <ValidityModal />
      </div>
    </div>
  ) : (
    <Login />
  )
}

export default App

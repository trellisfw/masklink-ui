import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import overmind from '../../../overmind'
import _ from 'lodash'
import ReactJson from 'react-json-view'
import Audit from './Audit'
import MaskedAudit from './MaskedAudit'
import CoI from './CoI'

function Content () {
  const { actions, state } = overmind()
  const myActions = actions.view.Modals.FileDetailsModal
  const myState = state.view.Modals.FileDetailsModal

  var jsonData: { [key: string]: any } | null = null
  var jsonTitle = ''
  if (_.isEmpty(myState.audit) === false) {
    jsonData = _.get(myState, 'audit')
    jsonTitle = 'audit'
  } else if (_.isEmpty(myState['audit-masked']) === false) {
    jsonData = _.get(myState, 'audit-masked')
    jsonTitle = 'masked-audit'
  } else if (_.isEmpty(myState.coi) === false) {
    jsonData = _.get(myState, 'coi')
    jsonTitle = 'coi'
  }
  if (jsonData) {
    jsonData = _.cloneDeep(jsonData)
    if (jsonData._id) delete jsonData._id
    if (jsonData._rev) delete jsonData._rev
    if (jsonData._type) delete jsonData._type
    if (jsonData._meta) delete jsonData._meta
  }

  return (
    <div>
      {jsonTitle === 'audit' ? (
        <Audit audit={jsonData} />
      ) : jsonTitle === 'masked-audit' ? (
        <MaskedAudit audit={jsonData} />
      ) : jsonTitle === 'coi' ? (
        <CoI coi={jsonData} />
      ) : (
        <span>Unknown Document Type</span>
      )}

      {!myState.showData ? (
        ''
      ) : jsonData === null ? (
        <span>&lt; No Data &gt;</span>
      ) : (
        <ReactJson
          src={jsonData}
          name={jsonTitle}
          collapsed={1}
          collapseStringsAfterLength={50}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
        />
      )}

      <div
        css={css`
          color: #2439ff;
          font-size: 16;
          margin-bottom: 7;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            cursor: pointer;
          `}
          onClick={() => myActions.viewPDF(myState.documentKey || '')}
        >
          {'VIEW PDF'}
        </div>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <div
          css={css`
            cursor: pointer;
          `}
          onClick={() => myActions.toggleShowData()}
        >
          {'VIEW DATA'}
        </div>
      </div>
    </div>
  )
}

export default Content

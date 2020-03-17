import React from 'react'
import { Modal, Header } from 'semantic-ui-react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import overmind from '../../overmind'
import { Validity } from '../../overmind/state'

function text (valid: Validity): string {
  switch (valid) {
    case Validity.Valid:
      return 'Valid'
    case Validity.Invalid:
      return 'Invalid'
    case Validity.Unknown:
      return 'Could not verify'
  }
}
function color (valid: Validity): string {
  switch (valid) {
    case Validity.Valid:
      return 'green'
    case Validity.Invalid:
      return 'red'
    case Validity.Unknown:
      return 'gray'
  }
}
const ValidityModal: React.FunctionComponent = () => {
  const { actions, state } = overmind()
  const myActions = actions.view.Modals.ValidityModal
  const myState = state.view.Modals.ValidityModal

  return (
    <Modal open={myState.open} onClose={myActions.close}>
      <Header content='Trellis Mask Check' />
      <Modal.Content>
        <div
          css={css`
            min-height: 350;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: ${color(state.valid)};
          `}
        >
          {text(state.valid)}
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default ValidityModal

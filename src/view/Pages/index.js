import React from 'react'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Data from './Data'

function Pages () {
  return (
    <div
      css={css`
        display: flex;
        flex: 1;
        box-shadow: inset 5px 5px 5px #dddddd;
      `}
    >
      <Data />
    </div>
  )
}

export default Pages

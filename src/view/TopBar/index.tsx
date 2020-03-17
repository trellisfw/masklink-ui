import React from 'react'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { Dropdown } from 'semantic-ui-react'
import overmind from '../../overmind'

const TopBar: React.FunctionComponent = () => {
  const { actions, state } = overmind()
  const skin = state.skin

  return (
    <div
      css={css`
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        height: 100px;
        border-bottom: 1px solid #979797;
      `}
    >
      <img
        css={css`
          height: 50px;
          padding-left: 20px;
        `}
        src={'skins/' + skin + '/' + state.skins[skin].logo.src}
        alt='logo'
      />
      <div css={{ marginRight: 50 }}>
        <Dropdown text={state.login.name || undefined}>
          <Dropdown.Menu>
            <Dropdown.Item
              icon='power'
              text='Logout'
              value='logout'
              onClick={actions.view.TopBar.logout}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default TopBar

import React, { ReactElement } from 'react'
import { AUTH_APIS } from '../../../util/auth'
import { psString } from '../../../util/localization'

export default function(): ReactElement {
  return (
    <div
      className="d-flex lb_loginBtn common_font"
      onClick={(): void => AUTH_APIS.login()}
    >
      {psString('header-login')}
    </div>
  )
}

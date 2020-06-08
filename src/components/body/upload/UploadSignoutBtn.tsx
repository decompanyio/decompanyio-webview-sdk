import React, { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import { AUTH_APIS } from '../../../util/auth'

interface UploadSignoutBtnProps {
  loading: boolean
}

export default function({ loading }: UploadSignoutBtnProps): ReactElement {
  const handleSignOutBtnClick = () => AUTH_APIS.logout()

  return (
    <div
      onClick={() => handleSignOutBtnClick()}
      className={
        'common_signOutBtn  u_signOutBtnWrapper ' +
        (loading ? 'common_disabledBtn' : '')
      }
    >
      {psString('common-logout')}
    </div>
  )
}

import React, { ReactElement } from 'react'
import UserInfo from '../../../service/model/UserInfo'
import Avatar from '../../common/avatar/Avatar'
import { AUTH_APIS } from '../../../util/auth'

interface UploadProfileProps {
  userInfo: UserInfo
}

export default function({ userInfo }: UploadProfileProps): ReactElement {
  return (
    <div className="up_container">
      <Avatar
        size={33}
        picture={userInfo.picture}
        croppedArea={userInfo.croppedArea}
      />
      <div onClick={() => AUTH_APIS.linkToMain()}>
        {userInfo.username || userInfo.email}
      </div>
    </div>
  )
}

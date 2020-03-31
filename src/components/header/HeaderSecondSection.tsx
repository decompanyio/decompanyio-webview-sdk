import React, { useState } from 'react'
import Avatar from '../common/avatar/Avatar'
import HeaderSearch from './HeaderSearch'
import ProfileCard from '../common/card/ProfileCard'
import { AUTH_APIS } from '../../util/auth'
import LoginBtn from '../common/button/LoginBtn'
import UserInfo from '../../service/model/UserInfo'

interface HeaderSecondSectionProps {
  userInfo: UserInfo
}

export default function({ userInfo }: HeaderSecondSectionProps) {
  const [profileCardShow, setProfileCardShow] = useState(false)
  const [avatarShow, setAvatarShow] = useState(true)

  const searchBarOn = (on: boolean) => setAvatarShow(!on)

  const handleProfileCardClick = () => {
    if (profileCardShow) setProfileCardShow(false)
  }
  const handleAvatarClick = () => setProfileCardShow(!profileCardShow)

  const handleCloseBtnClick = () => {
    console.log('close')
  }

  return (
    <div className="hss_container d-flex col-7 col-sm-6 pr-0">
      <HeaderSearch searchBarOn={searchBarOn} />

      {avatarShow && (
        <div className="ml-2">
          {AUTH_APIS.isLogin() ? (
            <Avatar
              size={34}
              picture={userInfo.picture}
              croppedArea={userInfo.croppedArea}
              click={handleAvatarClick}
            />
          ) : (
            <LoginBtn />
          )}
        </div>
      )}

      {avatarShow && profileCardShow && (
        <ProfileCard click={handleProfileCardClick} userInfo={userInfo} />
      )}

      {avatarShow && (
        <div
          className="hss_cancelWrapper ml-3"
          onClick={() => handleCloseBtnClick()}
        >
          <i className={'material-icons'}>close</i>
        </div>
      )}
    </div>
  )
}

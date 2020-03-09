import React, { useState } from 'react'
import Avatar from '../common/avatar/Avatar'
import HeaderSearch from './HeaderSearch'
import ProfileCard from '../common/card/ProfileCard'

export default function() {
  const [profileCardShow, setProfileCardShow] = useState(false)

  // 프로필 카드 클릭 관리
  const handleProfileCardClick = () => {
    if (profileCardShow) setProfileCardShow(false)
  }

  // 아바타 클릭 관리
  const handleAvatarClick = () => setProfileCardShow(!profileCardShow)

  return (
    <div className="hss_container d-flex col-7 pr-0">
      <HeaderSearch />
      <Avatar
        size={34}
        picture={''}
        croppedArea={[]}
        click={handleAvatarClick}
      />
      {profileCardShow && <ProfileCard click={handleProfileCardClick} />}
    </div>
  )
}

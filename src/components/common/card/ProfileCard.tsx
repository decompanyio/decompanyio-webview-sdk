import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import { psString } from '../../../util/localization'
import common from '../../../util/common'
import { repos } from '../../../util/repos'
import UserInfo from '../../../service/model/UserInfo'

type Type = {
  click: any
}

function ProfileCard({ click }: Type) {
  const [userInfo, setUserInfo] = useState(new UserInfo(null))

  // 클릭 관리
  const handleClick = (e: any) => {
    const targetElement = e.target
    const profileCard = document.getElementById('profileCard')

    if (profileCard) {
      if (!profileCard.contains(targetElement)) click()
    }
  }

  // 마이페이지 클릭 관리
  const handleMyPageClick = () => {
    common.scrollTop()
    click()
  }

  // 유저 정보 GET
  const getUserInfo = () =>
    repos.Auth.getUserInfo().then((res: any) => setUserInfo(res))

  useEffect(() => {
    window.addEventListener('click', handleClick)

    void getUserInfo()

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="pc_container" id="profileCard">
      <div className="mt-4 mb-4">
        <Avatar size={90} picture={userInfo.picture} croppedArea={[]} />
        <div className="pc_username mt-3">{userInfo.email}</div>
      </div>

      <Link to="/profile" onClick={() => handleMyPageClick()} rel="nofollow">
        <div className="pc_accountBtn d-flex" data-id={userInfo.email}>
          {psString('profile-card-my-page')}
        </div>
        <div className="pc_logoutBtn d-flex">
          {psString('profile-card-logout')}
        </div>
      </Link>
    </div>
  )
}

export default ProfileCard

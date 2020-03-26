import React from 'react'
import HeaderFirstSection from './HeaderFirstSection'
import HeaderSecondSection from './HeaderSecondSection'
import UserInfo from '../../service/model/UserInfo'

interface HeaderProps {
  userInfo: UserInfo
}

export default function({ userInfo }: HeaderProps) {
  return (
    <header>
      <nav id="headerMainNav" className="h_fixed d-flex">
        <div className="h_container container d-flex">
          <HeaderFirstSection />
          <HeaderSecondSection userInfo={userInfo} />
        </div>
      </nav>
    </header>
  )
}

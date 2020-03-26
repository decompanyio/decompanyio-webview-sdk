import React from 'react'
import UserInfo from '../../../service/model/UserInfo'

interface ProfileNameProps {
  category: string
  userInfo?: UserInfo
}

export default function({ category, userInfo }: ProfileNameProps) {
  return (
    <div className="pn_container">
      {(userInfo && userInfo.email + ' ') + category}
    </div>
  )
}

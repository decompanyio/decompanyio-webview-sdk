import React from 'react'
import { AUTH_APIS } from '../../../util/auth'

interface AuthBtnProps {
  platform: string // google
}

export default function({ platform }: AuthBtnProps) {
  return (
    <div className="ab_container mb-3" onClick={() => AUTH_APIS.login(platform)}>
      <div className="ab_wrapper" />
      <div className={'ab_iconContainer ab_iconContainer_' + platform}>
        <img
          src={
            'https://res.share.decompany.io/static/image/auth/ic_auth_' +
            platform +
            '.png'
          }
          alt="Google"
        />
      </div>
      <div className={'ab_platformName ab_platformName_' + platform}>
        Log in with {platform}
      </div>
    </div>
  )
}

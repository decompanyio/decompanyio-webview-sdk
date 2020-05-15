import React from 'react'
import { AUTH_APIS } from '../../../util/auth'

interface AuthBtnProps {
  provider: string // google
}

export default function({ provider }: AuthBtnProps) {
  return (
    <div
      className="ab_container mb-3"
      onClick={() => AUTH_APIS.login(provider, document.location.href)}
    >
      <div className="ab_wrapper" />
      <div className={'ab_iconContainer ab_iconContainer_' + provider}>
        <img
          src={
            'https://res.share.decompany.io/static/image/auth/ic_auth_' +
            provider +
            '.png'
          }
          alt="Google"
        />
      </div>
      <div className={'ab_providerName ab_providerName_' + provider}>
        Log in with {provider}
      </div>
    </div>
  )
}

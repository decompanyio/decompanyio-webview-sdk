import React from 'react'
import AuthBtn from '../../common/button/AuthBtn'

export default function() {
  return (
    <div className="l_container">
      <div className="l_component">
        <div className="l_logoWrapper">
          <a
            className="l_logo"
            href="https://polarishare.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
          />
        </div>
        <div className="l_btnWrapper">
          <AuthBtn provider="google" />
        </div>
      </div>
    </div>
  )
}

import React from 'react'
// @ts-ignore
import { DoubleBounce } from 'better-react-spinkit'
import { APP_CONFIG } from '../../../util/app.config'

export default function() {
  return (
    <div className="lm_wrapper">
      <img
        src={APP_CONFIG.domain().static + '/image/logo-cut.png'}
        alt="POLARIS SHARE"
      />
      <DoubleBounce name="ball-pulse-sync" color="#ddeaff" size={110} />
    </div>
  )
}

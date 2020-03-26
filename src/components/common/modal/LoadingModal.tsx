import React from 'react'
// @ts-ignore
import { DoubleBounce } from 'better-react-spinkit'
import { APP_CONFIG } from '../../../util/app.config'

interface LoadingModalProps {
  opacity?: number
}

export default function({ opacity }: LoadingModalProps) {
  const wrapperStyle = {
    opacity: opacity || 1
  }

  return (
    <div className="lm_wrapper d-flex" style={wrapperStyle}>
      <img
        src={APP_CONFIG.domain().static + '/image/logo-cut.png'}
        alt="POLARIS SHARE"
      />
      <DoubleBounce name="ball-pulse-sync" color="#ddeaff" size={110} />
    </div>
  )
}

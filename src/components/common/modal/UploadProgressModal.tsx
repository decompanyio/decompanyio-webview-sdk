import React from 'react'
// @ts-ignore
import { Circle } from 'better-react-spinkit'
import { psString } from '../../../util/localization'

interface UploadProgressModalProps {
  percentage: number
}

export default function({ percentage }: UploadProgressModalProps) {
  const handleCloseBtnClick = () => document.getElementById('closeSDK')!.click()

  if (percentage === 0) return <div />

  return (
    <div className="upm_container">
      <div className="upm_progressWrapper" id="progressWrapper" />

      <div className="upm_progress" id="progressModal">
        <div className="upm_progressSecond">
          <div className="upm_percent">{percentage}%</div>
          <Circle size={100} color={'#3681fe'} />
        </div>
      </div>
      <div className="upm_closeContainer">
        <div className="upm_closeText" onClick={() => handleCloseBtnClick()}>
          {psString('upload-cancel')}
        </div>
      </div>
    </div>
  )
}

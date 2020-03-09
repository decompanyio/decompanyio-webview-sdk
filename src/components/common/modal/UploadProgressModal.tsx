import React from 'react'
// @ts-ignore
import { Circle } from 'better-react-spinkit'

type Type = {
  percentage: number
}

export default function({ percentage }: Type) {
  return (
    <div>
      <div className="upm_progressWrapper" id="progressWrapper" />
      <div className="upm_progress" id="progressModal">
        <div className="upm_progressSecond">
          <div className="upm_percent">{percentage}%</div>
          <Circle size={100} color={'#ffffff'} />
        </div>
      </div>
    </div>
  )
}

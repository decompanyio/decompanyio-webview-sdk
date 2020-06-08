import React, { ReactElement } from 'react'
import { psString } from '../../../util/localization'

export default function(): ReactElement {
  return (
    <div className="u_note">
      <span>Note:</span>
      {psString('upload-explain-1')}
      <a href={'https://polarishare.com/au'} target="_blank">
        {psString('upload-explain-2')}
      </a>
      {psString('upload-explain-3')}
      <a href={'https://polarishare.com/au'} target="_blank">
        {psString('upload-explain-4')}
      </a>
      <div className="u_noteSub">({psString('upload-explain-sub')})</div>
    </div>
  )
}

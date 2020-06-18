import React, { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import { commonNative } from '../../../util/commonNative'
import { APP_CONFIG } from '../../../util/app.config'

export default function(): ReactElement {
  const onOpenWindow = () => {
    commonNative.setWindowOpenUrl(APP_CONFIG.domain().ps)
    document.getElementById('openWindow')!.click()
  }

  return (
    <div className="u_note">
      <span>Note:</span>
      {psString('upload-explain-1')}
      <div className="u_link" onClick={() => onOpenWindow()}>{psString('upload-explain-2')}</div>
      {psString('upload-explain-3')}
      <div className="u_link" onClick={() => onOpenWindow()}>{psString('upload-explain-4')}</div>
      <div className="u_noteSub">({psString('upload-explain-sub')})</div>
    </div>
  )
}

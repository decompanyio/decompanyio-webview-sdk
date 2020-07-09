import { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import React from 'react'
import UploadCloseBtn from '../../body/upload/UploadCloseBtn'
import commonData from '../../../util/commonData'
import { AUTH_APIS } from '../../../util/auth'

interface LimitPrivateDocumentModalProps {
  privateDocumentCount: number
}

export default function({
  privateDocumentCount
}: LimitPrivateDocumentModalProps): ReactElement {
  if (privateDocumentCount < commonData.privateDocumentLimit) return <div />

  return (
    <div className="lpd_wrapper">
      <div className="lpd_dummy" />
      <div className="lpd_subjContainer">
        <div className="lpd_subj">
          {psString('upload-limit-private-doc-subj')}
        </div>
        <div className="lpd_contents">
          {psString('upload-limit-private-doc-contents')}
        </div>
        <div className="lpd_btnContainer">
          <UploadCloseBtn />

          <div className="common_okBtn" onClick={() => AUTH_APIS.linkToMain()}>
            {psString('upload-link-to-main')}
          </div>
        </div>
      </div>
    </div>
  )
}

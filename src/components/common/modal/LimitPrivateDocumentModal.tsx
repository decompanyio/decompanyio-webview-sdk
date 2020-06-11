import { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import React from 'react'
import UploadCloseBtn from '../../body/upload/UploadCloseBtn'
import commonData from '../../../util/commonData'
import { APP_CONFIG } from '../../../util/app.config'
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

          <a
            href={
              APP_CONFIG.domain().auth +
              '/external/' +
              AUTH_APIS.getTokens().authorization_token
            }
            target="_blank"
            rel="noopener noreferrer"
            title="Link to Polaris Share"
          >
            <div className="common_okBtn">
              {psString('upload-link-to-main')}
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

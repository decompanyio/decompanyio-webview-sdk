import React, { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import UploadCloseBtn from '../../body/upload/UploadCloseBtn'
import commonData from '../../../util/commonData'
import { AUTH_APIS } from '../../../util/auth'
import { APP_CONFIG } from '../../../util/app.config'

interface UploadCompleteModalProps {
  uploadComplete: boolean
  privateDocumentCount: number
}

export default function({
  uploadComplete,
  privateDocumentCount
}: UploadCompleteModalProps): ReactElement {
  if (!uploadComplete) return <div />

  return (
    <div className="ucm_wrapper">
      <div className="ucm_dummy" />
      <div className="ucm_subjContainer">
        <div className="ucm_subj">{psString('upload-complete')}</div>
        <div className="ucm_contents">
          <div>{psString('upload-doc-desc-3-a')}</div>
          {privateDocumentCount < commonData.privateDocumentLimit ? (
            <div className="ucm_contentsSub">
              ({psString('upload-doc-desc-1-a')}
              {privateDocumentCount}
              {psString('upload-doc-desc-1-b')})
            </div>
          ) : (
            <div className="ucm_contentsSub">
              ({psString('upload-doc-desc-2-a')})
            </div>
          )}
        </div>
        <div className="ucm_btnContainer">
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

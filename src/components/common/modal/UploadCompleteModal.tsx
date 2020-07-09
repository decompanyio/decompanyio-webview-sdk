import React, { ReactElement } from 'react'
import { psString } from '../../../util/localization'
import UploadCloseBtn from '../../body/upload/UploadCloseBtn'
import commonData from '../../../util/commonData'
import { AUTH_APIS } from '../../../util/auth'

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

          <div className="common_okBtn" onClick={() => AUTH_APIS.linkToMain()}>
            {psString('upload-link-to-main')}
          </div>
        </div>
      </div>
    </div>
  )
}

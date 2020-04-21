import React, { useEffect, useState } from 'react'
import { psString } from '../../../util/localization'
import UploadProgressModal from '../../common/modal/UploadProgressModal'
import { AUTH_APIS } from '../../../util/auth'
import { repos } from '../../../util/repos'

export default function({ history, userInfo }: any) {
  const [titleError, setTitleError] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [percentage] = useState(0)

  // 제목 유효성 체크
  const validateTitle = (value: string) => {
    setTitleError(value.length > 0 ? '' : psString('upload-doc-error-1'))
    return value.length > 0
  }

  // 제목 변경 관리
  const handleTitleChange = (e: any) => {
    if (validateTitle(e.target.value)) setTitle(e.target.value)
  }

  const handleDescChange = (e: any) => setDesc(e.target.value)

  const handleSignOutBtnClick = () => AUTH_APIS.logout()

  const handleCloseBtnClick = () => {
    console.log('[Close button clicked]')
    console.log('=> POST "Close Event" to Polaris Office Native')
  }

  const handleUpload = (): void => {
    let data = {
      fileInfo: null,
      user: userInfo,
      tags: null,
      title: title,
      desc: desc,
      useTracking: true,
      forceTracking: false,
      isDownload: true,
      cc: []
    }

    // 문서 등록 API
    repos.Document.registerDocument(data)
      .then((res: any) => {
        console.log('[Complete Document Upload]')
        console.log('=> result', res)
        console.log('=> POST "Document Id" to Polaris Office Native')
        console.log('=> POST "Close Event" to Polaris Office Native')
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  const handleUploadBtnClick = (): void => {
    console.log('[Upload button clicked]')
    console.log('Title : ' + title + '\nDescription : ' + desc)
    console.log('=> POST "Upload Event" to PS SERVER')

    if (validateTitle(title)) handleUpload()
  }

  useEffect(() => {
    if (!AUTH_APIS.isLogin()) {
      history.push('/login')
    }
  }, [])

  return (
    <div className="u_container">
      <div className="common_modal_title">
        <h3>
          {psString('brand')} {psString('upload-doc-subj')}
        </h3>
      </div>

      <input
        type="text"
        placeholder={psString('common-modal-title')}
        id="docTitle"
        className={
          'common_input ' + (titleError.length > 0 ? 'common_inputWarning' : '')
        }
        onChange={e => handleTitleChange(e)}
      />
      <span>{titleError}</span>

      <textarea
        id="docDesc"
        placeholder={psString('common-modal-description')}
        className="u_textarea mt-4"
        onChange={e => handleDescChange(e)}
      />

      <div className="u_btnWrapper d-flex">
        <div
          onClick={() => handleSignOutBtnClick()}
          className="common_signOutBtn  u_signOutBtnWrapper"
        >
          {psString('common-logout')}
        </div>
        <div onClick={() => handleCloseBtnClick()} className="common_cancelBtn">
          {psString('common-modal-cancel')}
        </div>
        <div onClick={() => handleUploadBtnClick()} className="common_okBtn">
          {psString('common-modal-upload')}
        </div>
      </div>

      <UploadProgressModal percentage={percentage} />
    </div>
  )
}

import React, { useEffect, useState } from 'react'
// @ts-ignore
import { FadingCircle } from 'better-react-spinkit'
import { psString } from '../../../util/localization'
import UploadProgressModal from '../../common/modal/UploadProgressModal'
import { AUTH_APIS } from '../../../util/auth'
import common from '../../../util/common'
import UploadNote from './UploadNote'
import UserInfo from '../../../service/model/UserInfo'
import { repos } from '../../../util/repos'
import { commonNative } from '../../../util/commonNative'
import UploadSignoutBtn from './UploadSignoutBtn'
import LimitPrivateDocumentModal from '../../common/modal/LimitPrivateDocumentModal'
import UploadCompleteModal from '../../common/modal/UploadCompleteModal'
import { APP_CONFIG } from '../../../util/app.config'
import UploadCancelBtn from './UploadCancelBtn'

interface UploadProps {
  userInfo: UserInfo
}

export default function({ userInfo }: UploadProps) {
  const [titleError, setTitleError] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [percentage, setPercentage] = useState(0)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [latestPrivateDocumentCount, setLatestPrivateDocumentCount] = useState(
    0
  )

  // 제목 유효성 체크
  const validateTitle = (value: string) => {
    setTitleError(value.length > 0 ? '' : psString('upload-doc-error-1'))
    return value.length > 0
  }

  const onOpenWindow = () => {
    commonNative.setWindowOpenUrl(APP_CONFIG.domain().ps)
    document.getElementById('openWindow')!.click()
  }

  const handleUpload = (): void => {
    const {
      documentName,
      ext,
      locale,
      revision,
      size
    } = AUTH_APIS.getDocumentInfo()

    let data = {
      fileInfo: {
        file: {
          name: `${documentName}.${ext}`,
          size,
          ext,
          locale,
          revision
        }
      },
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
      .then(res => {
        setLatestPrivateDocumentCount(res.privateDocumentCount)
        commonNative.setSignedUrl(res.signedUrl)
        document.getElementById('getUploadUrl')!.click()
        handleProgress()
        handleCompleteUpload()
      })
      .catch((err: any) => {
        setErr(
          typeof err === 'string'
            ? err
            : 'An error occurred when uploading the document.'
        )
        console.error(err)
      })
  }

  const handleUploadBtnClick = (): void => {
    if (validateTitle(title)) {
      setLoading(true)
      disabledInputValue()
      handleUpload()
    }
  }

  const disabledInputValue = () => {
    const titleEle = document.getElementById('docTitle') as HTMLInputElement
    const descEle = document.getElementById('docDesc') as HTMLInputElement
    titleEle.disabled = true
    descEle.disabled = true
  }

  const handleProgress = () => {
    let interval = setInterval(() => {
      let _progress = commonNative.progress
      let _uploadComplete = commonNative.uploadComplete.result
      if (percentage !== _progress && _progress !== 0) setPercentage(_progress)

      if (_progress === 100) {
        clearInterval(interval)
        if (_uploadComplete === 0) setPercentage(100)
      }
    }, 100)
  }

  const handleCompleteUpload = () => {
    let interval = setInterval(() => {
      if (commonNative.uploadComplete.result === 0) {
        setUploadComplete(true)
        clearInterval(interval)
      } else if (commonNative.uploadComplete.result === 1) {
        setErr(
          'PO document upload error ::: ' + commonNative.uploadComplete.code
        )
        clearInterval(interval)
      }
    }, 1000)
  }

  // 제목 변경 관리
  const handleTitleChange = (e: any) => {
    if (validateTitle(e.target.value)) setTitle(e.target.value)
  }

  const handleDescChange = (e: any) => setDesc(e.target.value)

  useEffect(() => {
    const { documentName } = AUTH_APIS.getDocumentInfo()
    const titleEle = document.getElementById('docTitle') as HTMLInputElement
    titleEle.value = documentName
    setTitle(documentName)
  }, [])

  return (
    <div className="u_container">
      <div className="common_modal_title" onClick={() => onOpenWindow()}>
        <img
          className="u_logo"
          src="https://s3.ap-northeast-2.amazonaws.com/polarishare.io/assets/img/logo/logo_blue.png"
          alt="polaris share logo"
        />
        <div className="u_version">{common.getVersion()}</div>
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

      <UploadNote />

      <div className="u_btnWrapper d-flex">
        <UploadSignoutBtn loading={loading} />

        <UploadCancelBtn loading={loading} />

        <div
          onClick={() => handleUploadBtnClick()}
          className={'common_okBtn ' + (loading ? 'common_disabledBtn' : '')}
        >
          {loading && (
            <div className="common_loadingWrapper">
              <FadingCircle color="#3681fe" size={17} />
            </div>
          )}
          {psString('common-modal-upload')}
        </div>
      </div>

      <UploadProgressModal percentage={percentage} />

      <LimitPrivateDocumentModal
        privateDocumentCount={userInfo.privateDocumentCount}
      />

      <UploadCompleteModal
        uploadComplete={uploadComplete}
        privateDocumentCount={latestPrivateDocumentCount}
      />

      {err && <div className="app_error">ERROR :: {err}</div>}
    </div>
  )
}

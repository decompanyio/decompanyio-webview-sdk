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
import UploadCloseBtn from './UploadCloseBtn'
import UploadSignoutBtn from './UploadSignoutBtn'
import LimitPrivateDocumentModal from '../../common/modal/LimitPrivateDocumentModal'
import UploadCompleteModal from '../../common/modal/UploadCompleteModal'

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
        setLoading(false)
        setLatestPrivateDocumentCount(res.privateDocumentCount)
        clearInputValue()
        commonNative.setSignedUrl(res.signedUrl)
        document.getElementById('getUploadUrl')!.click()
        handleProgress()
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
      handleUpload()
    }
  }

  const clearInputValue = () => {
    const titleEle = document.getElementById('docTitle') as HTMLInputElement
    const descEle = document.getElementById('docDesc') as HTMLInputElement
    titleEle.value = ''
    descEle.value = ''
  }

  const handleProgress = () => {
    handleCompleteUpload()

    let interval = setInterval(() => {
      setPercentage(commonNative.progress)

      if (commonNative.progress === 100) {
        clearInterval(interval)
      }
    }, 500)
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
    }, 500)
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
      <div className="common_modal_title">
        <a
          href="https://polarishare.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <img
            className="u_logo"
            src="https://s3.ap-northeast-2.amazonaws.com/polarishare.io/assets/img/logo/logo_blue.png"
            alt="polaris share logo"
          />
        </a>
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

        <UploadCloseBtn loading={loading} />

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

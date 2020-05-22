import React, { useEffect, useState } from 'react'
// @ts-ignore
import { FadingCircle } from 'better-react-spinkit'
import { psString } from '../../../util/localization'
import UploadProgressModal from '../../common/modal/UploadProgressModal'
import { AUTH_APIS } from '../../../util/auth'
import { repos } from '../../../util/repos'
import { commonNative } from '../../../util/commonNative'
import common from '../../../util/common'

export default function({ history, userInfo }: any) {
  const [titleError, setTitleError] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [percentage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [tempResult, setTempResult] = useState('')

  // 제목 유효성 체크
  const validateTitle = (value: string) => {
    setTitleError(value.length > 0 ? '' : psString('upload-doc-error-1'))
    return value.length > 0
  }

  const clearInputValue = () => {
    const titleEle = document.getElementById('docTitle') as HTMLInputElement
    const descEle = document.getElementById('docDesc') as HTMLInputElement
    titleEle.value = ''
    descEle.value = ''
  }

  // 제목 변경 관리
  const handleTitleChange = (e: any) => {
    if (validateTitle(e.target.value)) setTitle(e.target.value)
  }

  const handleDescChange = (e: any) => setDesc(e.target.value)

  const handleSignOutBtnClick = () => AUTH_APIS.logout()

  const handleCloseBtnClick = () =>
    document.getElementById('closeWebView')!.click()

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
        clearInputValue()
        commonNative.setSignedUrl(res.signedUrl)
        document.getElementById('getUploadUrl')!.click()
      })
      .catch((err: any) => {
        setTempResult(title + ' upload fail!')
        console.log('=> 문서 등록 실패 시 예외 처리 필요 합니다.')
        console.error(err)
      })
  }

  const handleUploadBtnClick = (): void => {
    if (validateTitle(title)) {
      setLoading(true)
      handleUpload()
    }
  }

  useEffect(() => {
    if (!AUTH_APIS.isLogin()) {
      history.push('/login')
    }

    const { documentName } = AUTH_APIS.getDocumentInfo()
    const titleEle = document.getElementById('docTitle') as HTMLInputElement
    titleEle.value = documentName
    setTitle(documentName)
  }, [])

  return (
    <div className="u_container">
      <div className="u_version">{common.getVersion()}</div>
      <div className="common_modal_title">
        <a
          className="u_logo"
          href="https://polarishare.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
        />
        <h3>{psString('upload-doc-subj')}</h3>
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
          className={
            'common_signOutBtn  u_signOutBtnWrapper ' +
            (loading ? 'common_disabledBtn' : '')
          }
        >
          {psString('common-logout')}
        </div>
        <div
          onClick={() => handleCloseBtnClick()}
          className={
            'common_cancelBtn ' + (loading ? 'common_disabledBtn' : '')
          }
        >
          {psString('common-modal-cancel')}
        </div>
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

      <div>{tempResult}</div>
    </div>
  )
}

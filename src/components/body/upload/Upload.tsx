import React, { useEffect, useState } from 'react'
import { psString } from '../../../util/localization'
import UploadProgressModal from '../../common/modal/UploadProgressModal'

export default function() {
  const [titleError, setTitleError] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [percentage] = useState(0)

  // 제목 유효성 체크
  const validateTitle = (value: string) => {
    setTitleError(value.length > 0 ? '' : psString('edit-doc-error-1'))
    return value.length > 0
  }

  // 제목 변경 관리
  const handleTitleChange = (e: any) => {
    if (validateTitle(e.target.value)) setTitle(e.target.value)
  }

  // 설명 수정 관리
  const handleDescChange = (e: any) => setDesc(e.target.value)

  // 닫기 버튼 관리
  const handleClickClose = () => {
    console.log('close')
  }

  // 업로드 버튼 관리
  const handleUploadBtn = () => {
    console.log('upload')
  }

  useEffect(() => {
    console.log(title, desc)
  }, [])

  return (
    <div className="container">
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
        <div onClick={() => handleClickClose()} className="common_cancelBtn">
          {psString('common-modal-cancel')}
        </div>
        <div onClick={() => handleUploadBtn()} className="common_okBtn">
          {psString('common-modal-upload')}
        </div>
      </div>

      <UploadProgressModal percentage={percentage} />
    </div>
  )
}

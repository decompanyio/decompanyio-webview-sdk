import React, { useState } from 'react'
import common from '../../../util/common'
import { psString } from '../../../util/localization'
import { repos } from '../../../util/repos'
import LoadingModal from '../../common/modal/LoadingModal'

interface ProfileItemOptionProps {
  idx: number
  documentData: any
  handleDeleteAfter: any
}

export default function({
  idx,
  documentData,
  handleDeleteAfter
}: ProfileItemOptionProps) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDownloadClick = () =>
    repos.Document.getDocumentDownloadUrl({
      documentId: documentData.documentId
    })
      .then(result => {
        const a = document.createElement('a')

        a.style.display = 'none'
        document.body.appendChild(a)
        a.href = result.downloadUrl
        a.setAttribute('download', documentData.documentName)
        a.click()

        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      })
      .catch(err => console.error(err))

  const handleDeleteBtnClick = (): void => {
    setLoading(true)
    repos.Document.deleteDocument({
      isDeleted: true,
      documentId: documentData.documentId
    })
      .then((): Promise<boolean> => handleDeleteAfter())
      .catch(
        (err: any): void => {
          setLoading(false)
          console.log(err)
        }
      )
  }

  return (
    <div className="common_optionBtn plio_optionBtn">
      <i
        className={'material-icons ' + (show ? 'plio_optionShow' : '')}
        onClick={() => setShow(!show)}
      >
        more_vert
      </i>

      <div
        className={'common_optionTable ' + (show ? '' : 'plio_optionTableHide')}
        id={'optionTable' + idx}
      >
        {documentData.state === 'CONVERT_COMPLETE' && (
          <div
            className="d-flex common_optionTableBtn plio_optionTableBtn"
            onClick={() => handleDownloadClick()}
          >
            <i className="material-icons">save_alt</i>
            <span>{psString('common-download')}</span>
          </div>
        )}

        {common.dateAgo(documentData.created) > 0 &&
          documentData.state &&
          documentData.state !== 'CONVERT_COMPLETE' && (
            <div
              className="common_optionTableBtn plio_optionTableBtn"
              onClick={() => handleDeleteBtnClick()}
            >
              <i className="material-icons">delete</i>
              {psString('common-delete')}
            </div>
          )}
      </div>

      {loading && <LoadingModal opacity={0.5} />}
    </div>
  )
}

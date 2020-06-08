import { psString } from '../../../util/localization'
import React from 'react'

interface UploadCloseBtnProps {
  loading?: boolean
}

export default function({ loading }: UploadCloseBtnProps) {
  const handleCloseBtnClick = () => document.getElementById('closeSDK')!.click()

  return (
    <div
      onClick={() => handleCloseBtnClick()}
      className={'common_cancelBtn ' + (loading ? 'common_disabledBtn' : '')}
    >
      {psString('common-modal-cancel')}
    </div>
  )
}

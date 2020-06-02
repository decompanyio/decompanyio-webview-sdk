import React from 'react'
import { commonNative } from '../util/commonNative'

export default function() {
  const handleClickElementForNative = (id: string) => {
    console.log('#' + id + ' clicked')

    if (id === 'getUploadUrl') console.log(commonNative.signedUrl)
  }

  return (
    <div>
      <div
        id="loadToken"
        className="common_triggerDivForNative"
        onClick={() => handleClickElementForNative('loadToken')}
      />
      <div
        id="getUploadUrl"
        className="common_triggerDivForNative"
        onClick={() => handleClickElementForNative('getUploadUrl')}
      />
      <div
        id="deleteToken"
        className="common_triggerDivForNative"
        onClick={() => handleClickElementForNative('deleteToken')}
      />
      <div
        id="closeSDK"
        className="common_triggerDivForNative"
        onClick={() => handleClickElementForNative('closeSDK')}
      />
    </div>
  )
}

import React, { ReactElement, useEffect } from 'react'
import { AUTH_APIS } from '../util/auth'
import common from '../util/common'
import { APP_CONFIG } from '../util/app.config'

export default function({ history }: any): ReactElement {
  useEffect(() => {
    common.setBodyStyleLock()

    if (typeof window !== 'undefined') {
      let url = new URL(document.location.href)
      let returnUrl = url.searchParams.get('return_url') || ''

      const {
        documentName,
        ext,
        locale,
        revision,
        size
      } = AUTH_APIS.getDocumentInfo()

      if (returnUrl && returnUrl === 'silent') {
        // console.log('This page is made for Silent Login.')
      } else {
        if (AUTH_APIS.isLogin())
          history.push(
            `/upload?documentName=${documentName}&ext=${ext}&locale=${locale}&revision=${revision}&size=${size}`
          )

        AUTH_APIS.handleAuthentication(window.location)
          .then(() => {
            console.log('login success')
            window.location.assign(
              `${
                APP_CONFIG.domain().mainHost
              }/upload?documentName=${documentName}&ext=${ext}&locale=${locale}&revision=${revision}&size=${size}`
            )
          })
          .catch((err): void => {
            console.log('err: ', err)
            AUTH_APIS.login()
          })
      }
    }

    return () => {
      // 스크롤 표시
      common.setBodyStyleUnlock()
    }
  }, [])

  return <div id="callbackIframeContainer" />
}

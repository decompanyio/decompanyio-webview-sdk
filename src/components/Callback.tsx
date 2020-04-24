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

      if (returnUrl && returnUrl === 'silent') {
        // console.log('This page is made for Silent Login.')
      } else {
        if (AUTH_APIS.isLogin()) history.push('/upload')

        AUTH_APIS.handleAuthentication(window.location)
          .then(() => {
            console.log('login success')
            window.location.assign(APP_CONFIG.domain().mainHost + '/upload')
          })
          .catch((err): void => {
            console.log('err: ', err)
            history.push('/login')
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

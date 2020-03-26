import React, { ReactElement, useEffect } from 'react'
import { AUTH_APIS } from '../util/auth'
import common from '../util/common'

export default function({ history }: any): ReactElement {
  useEffect(() => {
    common.setBodyStyleLock()

    if (typeof window !== 'undefined') {
      if (AUTH_APIS.isAuthenticated()) history.push('/')

      AUTH_APIS.handleAuthentication(window.location)
        .then(() => {
          window.location.assign('http://127.0.0.1:3000/profile')
        })
        .catch(
          (err): void => {
            console.log('err: ', err)
            history.push('/')
          }
        )
    }

    return () => {
      // 스크롤 표시
      common.setBodyStyleUnlock()
    }
  }, [])

  return <div id="callbackIframeContainer" />
}

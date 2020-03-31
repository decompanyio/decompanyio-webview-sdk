import { APP_CONFIG } from './app.config'
import commonData from './commonData'
import { repos } from './repos'
import { GetTokenProps, GetQueryParams } from './types'
import UserInfo from '../service/model/UserInfo'

export const AUTH_APIS = {
  login: (provider?: string, returnUrl?: string) => {
    window.location.href = `${
      APP_CONFIG.domain().auth
    }/authentication/signin/${provider ||
      commonData.defaultLoginPlatform}?redirectUrl=${
      APP_CONFIG.domain().mainHost
    }/callback${returnUrl ? '&returnUrl=' + returnUrl : ''}`
  },
  silentLogin: (email: string, provider?: string) => {
    window.location.href = `${
      APP_CONFIG.domain().auth
    }/authentication/signin/${provider ||
      commonData.defaultLoginPlatform}?prompt=none&login_hint=${email}&redirectUrl=${
      APP_CONFIG.domain().mainHost
    }/callback`
  },
  logout: (): void => {
    AUTH_APIS.clearSession()
    window.location.href = '/'
  },
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false
    const loginInfo = AUTH_APIS.getTokens()
    const expiresAt = JSON.parse(loginInfo.expiredAt)
    const userInfo = JSON.parse(loginInfo.userInfo)

    return new Date().getTime() < expiresAt && userInfo.email
  },
  isLogin: (): boolean => {
    const loginInfo = AUTH_APIS.getTokens()

    return (
      loginInfo.authorization_token !== '' &&
      loginInfo.expiredAt !== '' &&
      loginInfo.userInfo !== ''
    )
  },
  // URL 쿼리 -> 파라미터
  getParamsFromAuthUrlQuery: (qs: string): GetQueryParams => {
    const _qs = qs.split('+').join(' ')
    const re = /[?&]?([^=]+)=([^&]*)/g
    let params = {
      error: '',
      authorization_token: '',
      return_url: '',
      expired_at: 0
    }
    let tokens

    while ((tokens = re.exec(_qs))) {
      // @ts-ignore
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
    }
    return params
  },
  getMyInfo(): UserInfo {
    let userInfo = localStorage.getItem('ps_ui')
    let userInfoWithJson = userInfo ? JSON.parse(userInfo) : ''
    if (!userInfoWithJson && AUTH_APIS.isLogin()) {
      AUTH_APIS.scheduleRenewal()
      return new UserInfo(null)
    }
    return new UserInfo(userInfoWithJson)
  },
  // 계정 관련 토큰 로컬스토리지 저장
  setTokens: (at: string, ea: any, ru: string) =>
    new Promise(resolve => {
      if (at) localStorage.setItem('ps_at', at)
      if (ea) localStorage.setItem('ps_ea', AUTH_APIS.getExpiredAt(ea))
      if (ru) localStorage.setItem('ps_ru', ru)

      repos.Account.getUserInfo(at)
        .then(res => {
          localStorage.setItem('ps_ui', JSON.stringify(res))
          resolve(res)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }),
  getTokens: (): GetTokenProps => ({
    authorization_token: localStorage.getItem('ps_at') || '',
    expiredAt: localStorage.getItem('ps_ea') || '',
    returnUrl: localStorage.getItem('ps_ru') || '',
    userInfo: localStorage.getItem('ps_ui') || ''
  }),
  getExpiredAt: (ea: number): string => JSON.stringify(ea * 1000),
  clearSession(): void {
    localStorage.removeItem('ps_at')
    localStorage.removeItem('ps_ea')
    localStorage.removeItem('ps_ru')
    localStorage.removeItem('ps_ui')

    // Tracking API
    localStorage.removeItem('tracking_info')

    // Content Editor
    localStorage.removeItem('content')
  },
  handleAuthentication: (location: any) =>
    new Promise((resolve, reject) => {
      const query = AUTH_APIS.getParamsFromAuthUrlQuery(location.search)

      if (query.error) {
        AUTH_APIS.clearSession()
        reject()
      } else {
        const at = query.authorization_token || ''
        const ea = query.expired_at || ''
        const ru = query.return_url || ''

        AUTH_APIS.setTokens(at, ea, ru).then((userInfo: any) =>
          AUTH_APIS.syncAuthAndRest(userInfo, at).then(() =>
            resolve(userInfo.email)
          )
        )
      }
    }),
  syncAuthAndRest: (ui: any, at: string) =>
    new Promise(resolve => {
      if (at) {
        repos.Account.syncAuthAndRest(ui, at)
          .then((res: any) => {
            localStorage.setItem('user_sync', JSON.stringify(res))
            resolve()
          })
          .catch(
            (): void => {
              console.error('Login failed because user sync failed.')
              AUTH_APIS.logout()
            }
          )
      } else {
        console.log('session is not init...')
        AUTH_APIS.logout()
      }
    }),
  renewSession: (): Promise<string> =>
    new Promise((resolve, reject) => {
      AUTH_APIS.iframeHandler()
        .then((at: any) => {
          resolve(at)
        })
        .catch(err => {
          AUTH_APIS.clearSession()
          console.log('renewSession error')
          reject(err)
        })
    }),
  scheduleRenewal: () =>
    new Promise((resolve, reject) => {
      let expiresAt = JSON.parse(localStorage.getItem('ps_ea') || '{}')
      let at = localStorage.getItem('ps_at') || ''
      let timeout = expiresAt - Date.now() // mms

      const _renewSession = () =>
        AUTH_APIS.renewSession()
          .then(at => {
            resolve(at)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })

      return timeout > 0 ? resolve(at) : _renewSession()
    }),
  iframeHandler: (provider?: string) =>
    new Promise((resolve, reject) => {
      const callbackIframeContainer = document.getElementById(
        'callbackIframeContainer'
      ) as HTMLElement

      console.log(callbackIframeContainer)

      if (!callbackIframeContainer) reject()

      const iframeEle = document.createElement('iframe')
      iframeEle.id = 'authIframe'
      iframeEle.style.display = 'none'
      iframeEle.src = `${
        APP_CONFIG.domain().auth
      }/authentication/signin/${provider ||
        commonData.defaultLoginPlatform}?prompt=none&login_hint=${
        AUTH_APIS.getMyInfo().email
      }&redirectUrl=${APP_CONFIG.domain().mainHost}/callback`

      if (
        callbackIframeContainer &&
        callbackIframeContainer.children.length !== 0
      )
        callbackIframeContainer.innerHTML = ''

      callbackIframeContainer.appendChild(iframeEle)

      // TODO IE, 표준 방법도 추가
      // iframeEle.onload = AUTH_APIS.iframeEventListener(iframeEle.id)
      iframeEle.addEventListener('load', function(_e): void {
        AUTH_APIS.iframeEventListener(iframeEle.id)
          .then(at => resolve(at))
          .catch(err => reject(err))
      })
    }),
  iframeEventListener: (id: string) =>
    new Promise((resolve, reject) => {
      const callbackIframeContainer = document.getElementById(
        'callbackIframeContainer'
      ) as HTMLElement
      const iframeEle = document.getElementById(id) as HTMLIFrameElement

      if (iframeEle && iframeEle.contentWindow) {
        const urlFromIframe = iframeEle.contentWindow.location.href

        if (urlFromIframe && urlFromIframe !== 'about:blank') {
          let url = new URL(urlFromIframe)
          let at = url.searchParams.get('authorization_token') || ''
          let ea = AUTH_APIS.getExpiredAt(
            Number(url.searchParams.get('expired'))
          )
          AUTH_APIS.setTokens(at, ea, '')
          iframeEle.removeAttribute('onload')
          callbackIframeContainer.innerHTML = ''
          resolve(at)
        }
      } else {
        let err = 'iframe does not exist.'
        reject(err)
      }
    })
}

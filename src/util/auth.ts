import repos from './repos'
import { GetQueryParams, GetTokenProps } from './types'
import UserInfo from '../service/model/UserInfo'
import commonData from './commonData'
import { APP_CONFIG } from './app.config'
import AuthService from '../service/rest/AuthService'

interface DocumentInfoProps {
  documentName: string
  ext: string
  locale: string
  revision: string
  size: string
}

export const AUTH_APIS = {
  login: (returnUrl?: string) => {
    window.location.href = `${APP_CONFIG.domain().auth}/authentication${
      APP_CONFIG.env === 'production'
        ? '/signin' + commonData.defaultLoginPlatform
        : ''
    }?redirectUrl=${APP_CONFIG.domain().mainHost}/callback${
      returnUrl ? '&returnUrl=' + returnUrl : ''
    }`
  },
  silentLogin: (email: string) => {
    window.location.href = `${APP_CONFIG.domain().auth}/authentication${
      APP_CONFIG.env === 'production'
        ? '/signin' + commonData.defaultLoginPlatform
        : ''
    }?prompt=none&login_hint=${email}&redirectUrl=${
      APP_CONFIG.domain().mainHost
    }/callback&returnUrl=silent`
  },
  refreshLogin: (rt: string) =>
    new Promise((resolve, reject) => {
      AuthService.GET.refreshToken(rt).then((res: any) => {
        const at = res.authorization_token || ''
        const rt = res.refresh_token || ''
        const ea = res.expired_at || ''
        const ru = res.return_url || ''

        AUTH_APIS.setTokens(at, rt, ea, ru)
          .then((userInfo: any) =>
            AUTH_APIS.syncAuthAndRest(userInfo, at).then(() => resolve(at))
          )
          .catch(err => {
            console.error(err)
            AUTH_APIS.clearSession()
            reject('Invalid Token')
          })
      })
    }),
  logout: (): void => {
    AUTH_APIS.clearSession()
    document.getElementById('deleteToken')!.click()
    window.location.href = `${
      APP_CONFIG.domain().auth
    }/authentication/signout?returnUrl=${APP_CONFIG.domain().mainHost}`
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
      loginInfo.authorization_token !== '' && loginInfo.refresh_token !== ''
    )
  },
  // callback, URL 쿼리 -> 파라미터
  getParamsFromAuthUrlQueryForCode: (qs: string): any =>
    new Promise(async resolve => {
      let params = {
        code: '',
        documentName: '',
        ext: '',
        locale: '',
        revision: '',
        size: ''
      }
      let parser = document.createElement('a')
      parser.href = qs
      let query = parser.search.substring(1)
      let vars = query.split('&')

      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        // @ts-ignore
        params[pair[0]] =
          pair[0] === 'documentName' ? decodeURIComponent(pair[1]) : pair[1]
      }

      //console.log(params.code)
      //console.log(window.atob(params.code))

      AUTH_APIS.setDocumentInfo(params)
        .then(() => {
          if (params.code)
            return resolve({ refresh_token: window.atob(params.code) })
          else
            return resolve({
              errMsg: '',
              refresh_token: ''
            })
        })
        .catch(() => {
          let errMsg = 'Incorrect document information.'

          return resolve({ errMsg })
        })
    }),

  // URL 쿼리 -> 파라미터
  getParamsFromAuthUrlQuery: (qs: string): GetQueryParams => {
    const _qs = qs.split('+').join(' ')
    const re = /[?&]?([^=]+)=([^&]*)/g
    let params = {
      error: '',
      authorization_token: '',
      refresh_token: '',
      return_url: '',
      expired_at: 0
    }
    let tokens

    while ((tokens = re.exec(_qs))) {
      // @ts-ignore
      params[tokens[1]] = tokens[2]
    }
    return params
  },

  // PO로부터 문서 GET한 값, 세션 토큰에 저장 합니다.
  getMyInfo(): UserInfo {
    let userInfo = sessionStorage.getItem('ps_ui')
    let refreshToken = sessionStorage.getItem('ps_rt') || ''
    let userInfoWithJson = userInfo ? JSON.parse(userInfo) : ''
    if (!userInfoWithJson && AUTH_APIS.isLogin()) {
      AUTH_APIS.refreshLogin(refreshToken)
      return new UserInfo(null)
    }
    return new UserInfo(userInfoWithJson)
  },

  // 계정 관련 토큰 로컬스토리지 저장
  setDocumentInfo: ({
    documentName,
    ext,
    locale,
    revision,
    size
  }: DocumentInfoProps) =>
    new Promise((resolve, reject) => {
      let r = /\\u([\d\w]{4})/gi
      documentName = documentName.replace(r, function(_match, grp) {
        return String.fromCharCode(parseInt(grp, 16))
      })

      const data = {
        documentName: documentName,
        ext,
        locale,
        revision,
        size
      }

      if (data.documentName && data.documentName !== 'undefined' && data.ext) {
        sessionStorage.setItem('ps_di', JSON.stringify(data))
        resolve()
      } else if (
        (!data.documentName || data.documentName === 'undefined') &&
        AUTH_APIS.getDocumentInfo()
      ) {
        resolve()
      } else {
        reject()
      }
    }),

  // PO로부터 문서 전달 받아 세션 토큰에 저장된 값을 GET 합니다.
  getDocumentInfo: () => {
    if (sessionStorage.getItem('ps_di'))
      return JSON.parse(sessionStorage.getItem('ps_di')!)
    else return {}
  },

  // 계정 관련 토큰 로컬스토리지 저장
  setTokens: (at: string, rt: string, ea: any, ru: string) =>
    new Promise(resolve => {
      if (at) sessionStorage.setItem('ps_at', at)
      if (rt) sessionStorage.setItem('ps_rt', rt)
      if (ea) sessionStorage.setItem('ps_ea', AUTH_APIS.getExpiredAt(ea))
      if (ru) sessionStorage.setItem('ps_ru', ru)

      repos.Account.getUserInfo(at, rt)
        .then(res => {
          sessionStorage.setItem('ps_ui', JSON.stringify(res))
          resolve(res)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }),
  getTokens: (): GetTokenProps => ({
    authorization_token: sessionStorage.getItem('ps_at') || '',
    refresh_token: sessionStorage.getItem('ps_rt') || '',
    expiredAt: sessionStorage.getItem('ps_ea') || '',
    returnUrl: sessionStorage.getItem('ps_ru') || '',
    userInfo: sessionStorage.getItem('ps_ui') || ''
  }),
  getExpiredAt: (ea: number): string => JSON.stringify(ea * 1000),
  clearSession(): void {
    sessionStorage.removeItem('ps_at')
    sessionStorage.removeItem('ps_rt')
    sessionStorage.removeItem('ps_ea')
    sessionStorage.removeItem('ps_ru')
    sessionStorage.removeItem('ps_ui')

    // Tracking API
    sessionStorage.removeItem('tracking_info')
  },
  handleAuthentication: (location: any) =>
    new Promise((resolve, reject) => {
      const query = AUTH_APIS.getParamsFromAuthUrlQuery(location.search)

      if (query.error) {
        AUTH_APIS.clearSession()
        reject()
      } else {
        const at = query.authorization_token || ''
        const rt = query.refresh_token || ''
        const ea = query.expired_at || ''
        const ru = query.return_url || ''

        // console.log('쿼리 token : ', at)

        AUTH_APIS.setTokens(at, rt, ea, ru).then((userInfo: any) =>
          AUTH_APIS.syncAuthAndRest(userInfo, at).then(() => {
            console.log(at, rt, ea, ru)
            resolve(userInfo.email)
          })
        )
      }
    }),
  syncAuthAndRest: (ui: any, at: string) =>
    new Promise(resolve => {
      if (at) {
        repos.Account.syncAuthAndRest(ui, at)
          .then((res: any) => {
            sessionStorage.setItem('user_sync', JSON.stringify(res))
            resolve()
          })
          .catch((): void => {
            console.error('Login failed because user sync failed.')
            AUTH_APIS.logout()
          })
      } else {
        console.log('session is not init...')
        AUTH_APIS.logout()
      }
    }),
  linkToMain: async () => {
    let authToken = await AUTH_APIS.refreshLogin(
      AUTH_APIS.getTokens().refresh_token
    ).then(res => res)

    window.open(APP_CONFIG.domain().auth + '/external/' + authToken)
    console.log(
      'url ::: ' + APP_CONFIG.domain().auth + '/external/' + authToken
    )
  }
}

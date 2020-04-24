import AxiosService from './AxiosService'

let accountSyncUrl = 'account/sync'
let userInfoUrl = 'authentication/userinfo'
let refreshTokenUrl = 'authentication/refresh'
let accountGetUrl = 'account/get'

export default {
  POST: {
    syncAuthAndRest: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestWithHeader(
          accountSyncUrl,
          'POST',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
  },
  GET: {
    refreshToken: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestWithUrlParamForRefresh(
          refreshTokenUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      }),
    userInfo: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestWithUrlPramForAuth(
          userInfoUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      }),
    accountInfo: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestGetWithHeader(
          accountGetUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
  }
}

import { AUTH_APIS } from './auth'

export const commonNative = {
  signedUrl: '',
  setSignedUrl: (_signedUrl: string) => {
    commonNative.signedUrl = _signedUrl
  },

  // 로그인 확인 시, PO 측에 인증 토큰을 보내야 합니다.
  loadToken: () => {
    if (AUTH_APIS.isLogin()) {
      const tokens = AUTH_APIS.getTokens()
      const tokensToStr = JSON.stringify(tokens)
      const tokensB64 = Buffer.from(tokensToStr).toString('base64')

      return tokensB64
    } else {
      return 'ERROR : User is not signed in.'
    }
  }
}

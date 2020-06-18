import { AUTH_APIS } from './auth'

export const commonNative = {
  signedUrl: '',
  windowOpenUrl: '',
  uploadComplete: {
    result: -1, // 0: success   1: fail   -1: default
    code: -1 // 0: unknown
  },
  progress: 0,
  setSignedUrl: (_signedUrl: string) => {
    commonNative.signedUrl = _signedUrl
  },
  setWindowOpenUrl: (_windowOpenUrl: string) => {
    commonNative.windowOpenUrl = _windowOpenUrl
  },

  // 로그인 확인 시, PO 측에 인증 토큰을 보내야 합니다.
  loadToken: () => {
    if (AUTH_APIS.isLogin()) {
      const tokens = AUTH_APIS.getTokens().refresh_token
      return Buffer.from(tokens).toString('base64')
    } else {
      return 'ERROR : User is not signed in.'
    }
  },

  // PO 측에서 문서 업로드 시, progress percentage 전송 위한 함수 입니다.
  onUploadProgress: (ratio: string) => {
    commonNative.progress = Number(ratio)
    return true
  },

  // PO 측에서 문서 업로드 완료/실패시, 결과값을 전달해 줍니다..
  onUploadComplete: (result: string, code?: string) => {
    commonNative.uploadComplete = {
      result: Number(result),
      code: Number(code) || -1
    }
    return true
  }
}

export interface GetTokenProps {
  authorization_token: string
  expiredAt: string
  returnUrl: string
  userInfo: string
}

export interface GetQueryParams {
  error: string
  authorization_token: string
  return_url?: string
  expired_at: number
}

import DocService from '../service/rest/DocService'
import UserInfo from '../service/model/UserInfo'
import CustomService from '../service/rest/CustomService'
import SearchDocuments from '../service/model/SearchDocuments'
import { AUTH_APIS } from './auth'
import AuthService from '../service/rest/AuthService'
import AccountInfo from '../service/model/AccountInfo'
import Register from '../service/model/Register'
import history from './history'

// let instance: any

export const init = () => {
  repos.ref()
  return repos
}

export const repos = {
  ref() {
    // 자기 참조
    // instance = this
  },
  async init() {
    let decodedUri = ''

    try {
      decodedUri = unescape(document.location.href)
    } catch (e) {
      await Promise.reject(e)
    }

    //console.log(decodeURI(document.location.href))
    //console.log(decodedUri)
    //console.log(unescape(document.location.href))

    // PO로 부터 문서 정보 GET 했는지 확인 합니다.
    const {
      authorization_token,
      refresh_token,
      errMsg
    } = await AUTH_APIS.getParamsFromAuthUrlQueryForCode(decodedUri)

    // TODO 작업 필요!
    if (errMsg) {
      const closeEle = document.getElementById('closeWebView') as HTMLElement
      closeEle.click()

      return Promise.reject(errMsg)
    }

    // 로그인 체크
    if (AUTH_APIS.isLogin())
      await AUTH_APIS.refreshLogin(AUTH_APIS.getTokens().refresh_token)
    else {
      // PO 에게 auth token 을 URL parameters 로 전달 받았을 시, refresh login 을 시도 합니다.
      if (authorization_token && refresh_token) {
        await AUTH_APIS.refreshLogin(refresh_token)
        history.push('/')
      } else {
        AUTH_APIS.clearSession()
      }
    }

    return Promise.resolve(true)
  },
  Auth: {
    async getUserInfo(at: string, rt: string) {
      let authorizationToken =
        at || (await AUTH_APIS.refreshLogin(rt).then(res => res))
      const _data = {
        header: {
          Authorization: authorizationToken
        }
      }

      return AuthService.GET.userInfo(_data)
        .then((result: any): UserInfo => new UserInfo(result.user))
        .catch(err => {
          console.log(err)
          return err
        })
    }
  },
  Document: {
    async registerDocument(data: any) {
      let fileInfo = data.fileInfo
      let user = data.user
      let tags = data.tags
      let title = data.title
      let desc = data.desc
      let useTracking = data.useTracking
      let forceTracking = data.forceTracking
      let isDownload = data.isDownload
      let cc = data.cc

      const params = {
        header: {
          Authorization: await AUTH_APIS.refreshLogin(
            AUTH_APIS.getTokens().refresh_token
          ).then(res => res)
        },
        data: {
          filename: fileInfo.file.name,
          size: fileInfo.file.size,
          username: user.username,
          sub: user.id,
          title: title,
          desc: desc,
          tags: tags,
          useTracking: useTracking,
          forceTracking: forceTracking,
          isDownload: isDownload,
          isPublic: false,
          cc: cc
        }
      }

      return DocService.POST.registerDocument(params)
        .then((res): Register => new Register(res))
        .catch(err => err)
    }
  },
  Custom: {
    getSearchDocuments(data: any) {
      return CustomService.GET.searchDocument(data)
        .then((result: any) => new SearchDocuments(result))
        .catch((err: any) => err)
    }
  },
  Account: {
    async getAccountInfo() {
      const data = {
        header: {
          Authorization: await AUTH_APIS.refreshLogin(
            AUTH_APIS.getTokens().refresh_token
          ).then(res => res)
        }
      }

      return AuthService.GET.accountInfo(data)
        .then((result): AccountInfo => new AccountInfo(result))
        .catch(
          (err): AccountInfo => {
            console.log(err)
            AUTH_APIS.logout()
            return new AccountInfo(null)
          }
        )
    },
    async getUserInfo(at: string, rt: string) {
      let authorizationToken =
        at || (await AUTH_APIS.refreshLogin(rt).then(res => res))
      const _data = {
        header: {
          Authorization: authorizationToken
        }
      }

      return AuthService.GET.userInfo(_data).then(
        (result: any): UserInfo => new UserInfo(result.user)
      )
    },
    async syncAuthAndRest(ui: UserInfo, at?: string) {
      let authorizationToken =
        at ||
        (await AUTH_APIS.refreshLogin(AUTH_APIS.getTokens().refresh_token)
          .then(res => res)
          .catch(err => {
            console.log(err)
            return false
          }))
      const _data = {
        header: {
          Authorization: authorizationToken
        },
        data: ui
      }

      return AuthService.POST.syncAuthAndRest(_data).then(result => result)
    }
  }
}

export default init()

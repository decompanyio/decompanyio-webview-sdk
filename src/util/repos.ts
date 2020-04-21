import ReactGA from 'react-ga'
import DocService from '../service/rest/DocService'
import DocumentList from '../service/model/DocumentList'
import DocumentDownload from '../service/model/DocumentDownload'
import UserInfo from '../service/model/UserInfo'
import CustomService from '../service/rest/CustomService'
import SearchDocuments from '../service/model/SearchDocuments'
import { AUTH_APIS } from './auth'
import AuthService from '../service/rest/AuthService'
import AccountInfo from '../service/model/AccountInfo'

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
  init() {
    let gaId =
      process.env.REACT_APP_ENV_SUB === 'production'
        ? 'UA-140503497-1'
        : 'UA-129300994-1'

    if (
      process.env.REACT_APP_ENV_SUB === 'production' ||
      process.env.REACT_APP_ENV_SUB === 'development'
    ) {
      ReactGA.initialize(gaId, {
        debug: false
      })

      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    // 로그인 체크
    if (AUTH_APIS.isLogin()) void AUTH_APIS.scheduleRenewal()
    else AUTH_APIS.clearSession()

    return Promise.resolve(true)
  },
  Auth: {
    async getUserInfo(at?: string) {
      let authorizationToken =
        at || (await AUTH_APIS.scheduleRenewal().then(res => res))
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
      let user = data.userInfo
      let tags = data.tags
      let title = data.title
      let desc = data.desc
      let useTracking = data.useTracking
      let forceTracking = data.forceTracking
      let isDownload = data.isDownload
      let cc = data.cc

      const params = {
        header: {
          Authorization: await AUTH_APIS.scheduleRenewal().then(res => res)
        },
        data: {
          filename: fileInfo.file.name,
          size: fileInfo.file.size,
          username: user.userName,
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

      DocService.POST.registerDocument(params)
        .then(res => res)
        .catch(err => err)
    },
    async getDocuments(data: any) {
      const params = {
        header: {
          Authorization: await AUTH_APIS.scheduleRenewal().then(
            (res: any) => res
          )
        },
        params: {
          pageSize: data.pageSize,
          pageNo: data.pageNo
        }
      }

      return DocService.GET.documents(params)
        .then((result: any): DocumentList => new DocumentList(result))
        .catch(
          (err: any): DocumentList => {
            console.log(err)
            return new DocumentList(null)
          }
        )
    },
    async getDocumentList(params: any) {
      return DocService.GET.documentList(params)
        .then((result: any) => new DocumentList(result))
        .catch((err: any) => err)
    },
    getDocumentDownloadUrl(params: any) {
      return DocService.GET.documentDownload(params)
        .then((result: any) => new DocumentDownload(result))
        .catch((err: any) => err)
    },
    async deleteDocument(data: any) {
      const _data = {
        header: {
          Authorization: await AUTH_APIS.scheduleRenewal().then(res => res)
        },
        data: data
      }
      return DocService.POST.updateDocument(_data)
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
          Authorization: await AUTH_APIS.scheduleRenewal().then(res => res)
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
    async getUserInfo(at?: string) {
      let authorizationToken =
        at || (await AUTH_APIS.scheduleRenewal().then((res: any) => res))
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
        (await AUTH_APIS.scheduleRenewal()
          .then((res: any) => res)
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

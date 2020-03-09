import DocService from '../service/rest/DocService'
import DocumentList from '../service/model/DocumentList'
import DocumentDownload from '../service/model/DocumentDownload'
import UserInfo from '../service/model/UserInfo'
import testData from './testData'
import CustomService from '../service/rest/CustomService'
import SearchDocuments from '../service/model/SearchDocuments'

let instance: any

export const init = () => {
  repos.ref()
  return repos
}

export const repos = {
  ref() {
    // 자기 참조
    instance = this
  },
  init() {
    return Promise.resolve(true)
  },
  Auth: {
    getUserInfo() {
      return new Promise((resolve, _reject) => {
        let userData = new UserInfo(testData.userInfo)

        resolve(userData)
      })
    }
  },
  Document: {
    // async getDocuments(data: any) {
    //   const params = {
    //     header: {
    //       Authorization: `Bearer ${await AUTH_APIS.renewSessionPromise().then(
    //         (res: any) => res.idToken
    //       )}`
    //     },
    //     params: {
    //       pageSize: data.pageSize,
    //       pageNo: data.pageNo
    //     }
    //   }
    //
    //   return DocService.GET.documents(params)
    //     .then((result: any) => new DocumentList(result))
    //     .catch((err: any) => err)
    // },
    async getDocumentList(params: any) {
      return DocService.GET.documentList(params)
        .then((result: any) => new DocumentList(result))
        .catch((err: any) => err)
    },
    getDocumentDownloadUrl(params: any) {
      return DocService.GET.documentDownload(params)
        .then((result: any) => new DocumentDownload(result))
        .catch((err: any) => err)
    } /*
    async deleteDocument(data: any) {
      const _data = {
        header: {
          Authorization: `Bearer ${await AUTH_APIS.renewSessionPromise().then(
            (res: any) => res.idToken
          )}`
        },
        data: data
      }
      return DocService.POST.updateDocument(_data)
        .then((rst: any) => new DocumentInfo(rst.result))
        .catch((err: any) => console.error(err))
    },*/,
    getMyList: async (data: any) =>
      instance.Query.getMyListFindMany(data)
        .then((res: any) => instance.Common.checkNone(res))
        .then((res: any) => res.map((v: any) => '"' + v.documentId + '"'))
        .then((res: any) => instance.Query.getDocumentListByIds(res))
        .then((res: any) => {
          let resultData = res
          resultData.Document.findByIds = res.Document.findByIds.filter(
            (l: any) => {
              let latestArr = res.DocumentFeatured.findByIds.filter(
                (f: any) => f._id === l._id
              )[0]
              return latestArr
                ? (l.latestVoteAmount = latestArr.latestVoteAmount)
                : true
            }
          )
          return resultData
        })
        .then((res: any) => {
          let resultData = res
          resultData.Document.findByIds = res.Document.findByIds.filter(
            (l: any) => {
              let latestArr = res.DocumentPopular.findByIds.filter(
                (p: any) => p._id === l._id
              )[0]
              return latestArr
                ? (l.latestPageview = latestArr.latestPageview)
                : true
            }
          )
          return resultData.Document.findByIds
        })
        .then(async (res: any) => {
          let ids = res.map((v: any) => '"' + v.accountId + '"')
          let userData = await instance.Query.getUserByIds(ids)
          return {
            resultList: res.filter((v: any) => {
              let idx = -1
              userData.map((u: any, i: any) =>
                idx === -1 && u._id === v.accountId ? (idx = i) : -1
              )
              return idx !== -1 ? (v.author = userData[idx]) : v
            })
          }
        })
  },
  Custom: {
    getSearchDocuments(data: any) {
      return CustomService.GET.searchDocument(data)
        .then((result: any) => new SearchDocuments(result))
        .catch((err: any) => err)
    }
  }
}

export default init()

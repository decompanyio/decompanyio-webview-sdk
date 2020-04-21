import AxiosService from './AxiosService'

let getDocumentUrl = 'document/info'
let getDocumentListUrl = 'document/list'
let documentDownloadUrl = 'document/download'
let getDocumentsUrl = 'account/documents'
let updateDocumentUrl = 'document/update'
let registerDocumentInfoUrl = 'document/regist'

export default {
  GET: {
    document: (data: any) => {
      return new Promise((resolve, reject) => {
        AxiosService._requestWithUrlPram(
          getDocumentUrl + '/' + data,
          'GET',
          null,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
    },
    documents: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestGetWithHeader(
          getDocumentsUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      }),
    documentList: (data: any) => {
      return new Promise((resolve, reject) => {
        AxiosService._requestWithUrlPram(
          getDocumentListUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
    },
    documentDownload: (data: any) => {
      return new Promise((resolve, reject) => {
        AxiosService._requestWithUrlPram(
          documentDownloadUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
    }
  },
  POST: {
    updateDocument: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestWithHeaderBody(
          updateDocumentUrl,
          'POST',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      }),
    registerDocument: (data: any) =>
      new Promise((resolve, reject) => {
        AxiosService._requestWithHeaderBody(
          registerDocumentInfoUrl,
          'POST',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
  }
}

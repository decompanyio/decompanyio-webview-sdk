import AxiosService from './AxiosService'

let getDocumentUrl = 'document/info'
let getDocumentListUrl = 'document/list'
let documentDownloadUrl = 'document/download'

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
  }
}

import AxiosService from './AxiosService'

let registerDocumentInfoUrl = 'document/regist'

export default {
  GET: {},
  POST: {
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

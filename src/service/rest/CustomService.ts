import AxiosService from './AxiosService'

let searchDocumentUrl = 'custom/search'

export default {
  GET: {
    searchDocument: (data: any) => {
      return new Promise((resolve, reject) => {
        AxiosService._requestWithSearchUrlPram(
          searchDocumentUrl,
          'GET',
          data,
          (data: any) => resolve(data),
          (err: any) => reject(err)
        )
      })
    }
  }
}

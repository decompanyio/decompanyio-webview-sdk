import SearchDocumentsItem from './SearchDocumentsItem'

export default class SearchDocuments {
  kind: string
  url: object
  queries: object
  context: object
  searchInformation: object
  items: []

  constructor(data: any) {
    this.kind = data && data.kind ? data.kind : ''
    this.url = data && data.url ? data.url : {}
    this.queries = data && data.queries ? data.queries : {}
    this.context = data && data.context ? data.context : {}
    this.searchInformation =
      data && data.searchInformation ? data.searchInformation : {}
    this.items = data && data.items ? this.setMetatags(data.items) : []
  }

  public setMetatags(data: any) {
    if (data.length > 0) {
      const tempArr = data
      tempArr.map((res: any) => new SearchDocumentsItem(res))
      return tempArr
    } else {
      return []
    }
  }
}

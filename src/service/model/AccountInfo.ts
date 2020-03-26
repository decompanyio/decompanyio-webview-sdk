export default class AccountInfo {
  public user: {}
  public deck: []
  public gas: []
  public privateDocumentCount: 0

  public constructor(data: any) {
    this.user = data && data.user ? data.user : {}
    this.deck = data && data.deck ? data.deck : []
    this.gas = data && data.gas ? data.gas : []
    this.privateDocumentCount =
      data && data.privateDocumentCount ? data.privateDocumentCount : 0
  }
}

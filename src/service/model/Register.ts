export default class Register {
  public documentId: string
  public accountId: string
  public signedUrl: string
  public privateDocumentCount: 0

  public constructor(data: any) {
    this.documentId = data && data.documentId ? data.documentId : ''
    this.accountId = data && data.accountId ? data.accountId : ''
    this.signedUrl = data && data.signedUrl ? data.signedUrl : ''
    this.privateDocumentCount =
      data && data.privateDocumentCount ? data.privateDocumentCount : 0
  }
}

export default class UserInfo {
  public connected: number
  public croppedArea: {}
  public email: string
  public familyName: string
  public locale: string
  public name: string
  public nickname: string
  public picture: string
  public provider: string
  public id: string
  public sub: string
  public username: string
  public ethAccount: string
  public privateDocumentCount: number

  public constructor(data: any) {
    this.connected = data && data.connected ? data.connected : 0
    this.croppedArea = data && data.croppedArea ? data.croppedArea : {}
    this.email = data && data.email ? data.email : ''
    this.familyName = data && data.family_name ? data.family_name : ''
    this.locale = data && data.locale ? data.locale : ''
    this.name = data && data.name ? data.name : 0
    this.nickname = data && data.nickname ? data.nickname : ''
    this.picture = data && data.picture ? data.picture : ''
    this.provider = data && data.provider ? data.provider : ''
    this.id = (data && (data.sub || data._id || data.id)) || ''
    this.sub = (data && (data.sub || data._id || data.id)) || ''
    this.username = data && data.username ? data.username : ''
    this.ethAccount = data && data.ethAccount ? data.ethAccount : ''
    this.privateDocumentCount = 0
  }
}

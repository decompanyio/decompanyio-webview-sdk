export default class UserInfo {
  connected: number
  croppedArea: any
  email: string
  familyName: string
  locale: string
  name: string
  nickname: string
  picture: string
  provider: string
  sub: string
  _id: string
  username: string
  ethAccount: string

  constructor(data: any) {
    this.connected = data && data.connected ? data.connected : 0
    this.croppedArea = data && data.croppedArea ? data.croppedArea : {}
    this.email = data && data.email ? data.email : ""
    this.familyName = data && data.family_name ? data.family_name : ""
    this.locale = data && data.locale ? data.locale : ""
    this.name = data && data.name ? data.name : 0
    this.nickname = data && data.nickname ? data.nickname : ""
    this.picture = data && data.picture ? data.picture : ""
    this.provider = data && data.provider ? data.provider : ""
    this.sub = data && data.sub ? data.sub : ""
    this._id = data && data._id ? data._id : ""
    this.username = data && data.username ? data.username : ""
    this.ethAccount = data && data.ethAccount ? data.ethAccount : ""
  }
}

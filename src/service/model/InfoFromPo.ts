import commonData from '../../util/commonData'

export default class InfoFromPo {
  extension: string
  tag: string

  constructor(data: any) {
    this.extension =
      data && data.extension ? data.extension : commonData.infoFromPO.extension
    this.tag = data && data.tag ? data.tag : commonData.infoFromPO.tag
  }
}

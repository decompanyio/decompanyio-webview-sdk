import commonData from '../../util/commonData'

export default class SearchDocuments {
  css_thumbnail: []
  metatags: []
  cse_image: []

  constructor(data: any) {
    this.css_thumbnail = data && data.css_thumbnail ? data.css_thumbnail : []
    this.metatags =
      data && data.metatags ? data.metatags : [commonData.metaData]
    this.cse_image = data && data.cse_image ? data.cse_image : []
  }
}

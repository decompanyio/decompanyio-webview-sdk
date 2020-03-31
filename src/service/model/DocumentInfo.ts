import UserInfo from './UserInfo'
import common from '../../util/common'

export default class DocumentInfo {
  public accountId: string
  public author: UserInfo
  public cc: []
  public created: number
  public desc: string
  public dimensions: { height: number; width: number }
  public documentId: string
  public documentName: string
  public documentSize: number
  public ethAccount: string
  public forceTracking: boolean
  public isBlocked: boolean
  public isDeleted: boolean
  public isDownload: boolean
  public isPublic: boolean
  public isRegistry: boolean
  public pdf: boolean
  public pdfBase64: boolean
  public seoTitle: string
  public shortUrl: string
  public state: string
  public tags: []
  public title: string
  public totalPages: number
  public updated: string
  public viewCount: number
  public useTracking: boolean
  public latestVoteAmount: number
  public latestPageview: number
  public id: string

  public constructor(data: any) {
    this.accountId = data && data.accountId ? data.accountId : ''
    this.author =
      data && data.author ? new UserInfo(data.author) : new UserInfo(null)
    this.cc = data && data.cc ? data.cc : []
    this.created = data && data.created ? data.created : 0
    this.desc = data && data.desc ? data.desc : ''
    this.dimensions =
      data && data.dimensions ? data.dimensions : { height: 0, width: 0 }
    this.documentId = data && data.documentId ? data.documentId : ''
    this.documentName = data && data.documentName ? data.documentName : ''
    this.documentSize = data && data.documentSize ? data.documentSize : 0
    this.ethAccount = data && data.ethAccount ? data.ethAccount : ''
    this.forceTracking = data && data.forceTracking ? data.forceTracking : false
    this.isBlocked = data && data.isBlocked ? data.isBlocked : false
    this.isDeleted = data && data.isDeleted ? data.isDeleted : false
    this.isDownload = data && data.isDownload ? data.isDownload : false
    this.isPublic = data && data.isPublic ? data.isPublic : false
    this.isRegistry = data && data.isRegistry ? data.isRegistry : false
    this.pdf = data && data.pdf ? data.pdf : false
    this.pdfBase64 = data && data.pdfBase64 ? data.pdfBase64 : false
    this.seoTitle = data && data.seoTitle ? data.seoTitle : ''
    this.shortUrl = data && data.shortUrl ? data.shortUrl : ''
    this.state = data && data.state ? data.state : ''
    this.tags = data && data.tags ? data.tags : []
    this.title = data && data.title ? data.title : ''
    this.totalPages = data && data.totalPages ? data.totalPages : 0
    this.updated =
      data && data.updated ? data.updated : common.timestampToDateTime(0)
    this.viewCount = data && data.viewCount ? data.viewCount : 0
    this.useTracking = data && data.useTracking ? data.useTracking : false
    this.id = (data && (data.sub || data._id || data.id)) || ''
    this.latestVoteAmount =
      data && data.latestVoteAmount ? data.latestVoteAmount : 0
    this.latestPageview = data && data.latestPageview ? data.latestPageview : 0
  }
}

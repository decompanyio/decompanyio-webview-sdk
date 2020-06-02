import { APP_CONFIG } from './app.config'

const imgDomain = APP_CONFIG.domain().image

export default {
  // 썸네일 GET
  getThumbnail: (
    documentId: string,
    size: number,
    pageNo: number,
    documentName: string
  ) => {
    let _size = size
    if (documentName) {
      if (
        documentName.lastIndexOf('.dotx') > 0 ||
        documentName.lastIndexOf('.dot') > 0 ||
        documentName.lastIndexOf('.docx') > 0
      ) {
        _size = 1024
      }
    }
    return imgDomain + '/' + documentId + '/' + _size + '/' + pageNo
  },

  // Scroll to top
  scrollTop: () => window.scrollTo(0, 0),

  // Set BODY TAG Style
  setBodyStyleLock: () => {
    if (typeof window === 'undefined') return false

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '5px'
    return Promise.resolve(true)
  },

  // Set BODY TAG Style
  setBodyStyleUnlock: () => {
    if (typeof window === 'undefined') return false

    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    return Promise.resolve(true)
  },

  // 오늘 기준 몇일 전
  dateAgo: (timestamp: number): number => {
    let currentDate = Number(new Date())
    let lastDate = Number(new Date(timestamp))
    return Math.floor((currentDate - lastDate) / (60 * 60 * 24 * 1000))
  },

  getIsMobile: (): boolean => {
    if (typeof window === 'undefined') return false
    return document.documentElement.clientWidth < 576
  },

  // change Timestamp to Datetime
  timestampToDateTime: (timestamp: number): string => {
    let date = new Date(timestamp)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    let year = date.getFullYear()
    let month = months[date.getMonth()]
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return (
      day +
      ' ' +
      month +
      ' ' +
      year +
      ' ' +
      (hour < 10 ? '0' : '') +
      hour +
      ':' +
      (min < 10 ? '0' : '') +
      min +
      ':' +
      (sec < 10 ? '0' : '') +
      sec
    )
  },

  // GET Version of this Project
  getVersion(): string {
    return 'v ' + process.env.REACT_APP_VERSION
  }
}

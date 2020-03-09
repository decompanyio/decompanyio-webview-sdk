import axios from 'axios'
import * as qs from 'qs'
import { APP_CONFIG } from '../../util/app.config'

export default {
  /**
   * @return {boolean}
   */
  DEBUG: () => false,

  getRootUrlWithApi: () => APP_CONFIG.domain().api + '/api/',
  getRootUrlWithWallet: () => APP_CONFIG.domain().wallet + '/api/',
  _request: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any,
    header?: any
  ) {
    if (this.DEBUG()) console.log('[request]\nurl: ' + url + '\ndata: ' + data)

    let _header = {}

    if (type !== 'GET') _header = { 'Content-Type': 'application/json' }
    if (header) _header = Object.assign(header, _header)

    // @ts-ignore
    axios({
      method: type,
      url: url,
      data: data,
      headers: _header
    })
      .then((response: any) => {
        if (this.DEBUG()) {
          console.log(
            '성공\nurl: ' + url + '\nres:\n' + JSON.stringify(response.data)
          )
        }
        if (response.data.success && response.data.success === true) {
          success(response.data)
        }
        // 성공 alert
        else failure(response.data.message || response.data)
      })
      .catch((error: any) => {
        if (error.response) {
          let status = error.response.status
          let headers = error.response.headers
          let data = error.response.data
          let statusText = error.response.statusText

          if (this.DEBUG()) {
            console.log(headers, data, status, statusText)
            console.log(
              'Error!\ncode:' +
                status +
                '\nmessage:' +
                statusText +
                '\nerror:' +
                error
            )
          }
          console.log('Status: ' + status)
        } else if (error.request) console.log(error.request)
        else console.log('Error', error)

        console.log(error)
        failure(error)
      })
      .then()
  },
  _requestWithUrlPram: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ) {
    data = data || {}
    let params = data ? '?' + qs.stringify(data) : ''
    this._request(
      this.getRootUrlWithApi() + url + params,
      type,
      '',
      success,
      failure,
      false
    )
  }
}

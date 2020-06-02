import axios from 'axios'
import * as qs from 'qs'
import { APP_CONFIG } from '../../util/app.config'

export default {
  /**
   * @return {boolean}
   */
  DEBUG: () => false,

  getRootUrlWithApi: () => APP_CONFIG.domain().api + '/api/',
  getSearchUrlWithApi: () => APP_CONFIG.domain().search + '/api/',
  getRootUrlWithAuth: (): string => APP_CONFIG.domain().auth + '/',
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

    let tempUrl = url.split('/')[5]

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

        if (
          (response.data.success &&
            response.data.success === true &&
            !response.data.message) ||
          tempUrl === 'refresh'
        ) {
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
  },
  _requestWithSearchUrlPram: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ) {
    data = data || {}
    let params = data ? '?' + qs.stringify(data) : ''
    this._request(
      this.getSearchUrlWithApi() + url + params,
      type,
      '',
      success,
      failure,
      false
    )
  },
  _requestWithHeader: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ): void {
    const _header = data.header || {}
    const _data = data.data || {}
    this._request(
      this.getRootUrlWithApi() + url,
      type,
      _data,
      success,
      failure,
      _header
    )
  },
  _requestWithUrlPramForAuth: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ): void {
    const _header = data.header || {}
    const _data = data.data || {}
    this._request(
      this.getRootUrlWithAuth() + url,
      type,
      _data,
      success,
      failure,
      _header
    )
  },
  _requestWithUrlParamForRefresh: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ): void {
    this._request(
      this.getRootUrlWithAuth() + url + '/' + data,
      type,
      null,
      success,
      failure
    )
  },
  _requestGetWithHeader: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ): void {
    const _header = data.header || {}
    let _params = data.params ? '?' + qs.stringify(data.params) : ''

    this._request(
      this.getRootUrlWithApi() + url + _params,
      type,
      null,
      success,
      failure,
      _header
    )
  },
  _requestWithHeaderBody: function(
    url: string,
    type: string,
    data: any,
    success: any,
    failure: any
  ): void {
    const _header = data.header || {}
    const _data = data.data || {}
    this._request(
      this.getRootUrlWithApi() + url,
      type,
      JSON.stringify(_data),
      success,
      failure,
      _header
    )
  }
}

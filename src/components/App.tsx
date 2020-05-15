import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Route, Router, Switch } from 'react-router-dom'
import '../assets/styles/app.css'
import '../assets/styles/common.css'
import routerList from '../util/routerList'
import history from '../util/history'
import { repos } from '../util/repos'
import LoadingModal from './common/modal/LoadingModal'
import { AUTH_APIS } from '../util/auth'
import UserInfo from '../service/model/UserInfo'
import Callback from './Callback'
import Login from './body/auth/Login'
import Native from './Native'
import { commonNative } from '../util/commonNative'

// @ts-ignore
export default function({ callMethods }: any) {
  const [init, setInit] = useState(false)
  const [userInfo, setUserInfo] = useState(new UserInfo(null))
  const [err, setErr] = useState('')

  const pathName = () =>
    history.location.pathname.split('/')[1].toLocaleLowerCase()

  // 나의 정보를 userInfo Hooks state 에 저장 합니다.
  const setMyInfo = () => {
    if (AUTH_APIS.isLogin() && userInfo.email.length === 0) {
      return repos.Account.getAccountInfo().then(result => {
        let res = new UserInfo(result.user)
        if (!res.username || res.username === '') res.username = res.email
        if (!res.picture) res.picture = AUTH_APIS.getMyInfo().picture

        res.privateDocumentCount = result.privateDocumentCount
        setUserInfo(res)

        return Promise.resolve()
      })
    } else {
      return Promise.resolve()
    }
  }

  useEffect(() => {
    // 외부에서 리액트 내부 함수를 호출하게 해줍니다.
    callMethods(commonNative)

    if (pathName() !== 'callback')
      repos
        .init()
        .then(() => setMyInfo())
        .then(() => {
          setInit(true)
        })
        .catch(err => setErr(err))
  }, [])

  useEffect(() => {
    if (init && AUTH_APIS.isLogin())
      document.getElementById('loadToken')!.click()
  }, [init])

  const getMainComponent = () => {
    if (pathName() === 'callback') return <Callback history={history} />
    if (init && !AUTH_APIS.isLogin()) {
      history.push('/')
      return <Login />
    }

    return (
      <div className="App">
        <div id="callbackIframeContainer" />
        {init ? (
          <div id="container" data-parallax="true">
            <Switch>
              {routerList.map((result, idx) => {
                let flag = false
                if (idx === 0) flag = true
                return (
                  <Route
                    exact={flag}
                    key={result.name}
                    path={result.path}
                    render={(props: any) => (
                      <result.component {...props} userInfo={userInfo} />
                    )}
                  />
                )
              })}
            </Switch>
          </div>
        ) : (
          <LoadingModal />
        )}

        {err && <div>{err}</div>}

        <ReactTooltip />

        <Native />
      </div>
    )
  }

  return <Router history={history}>{getMainComponent()}</Router>
}

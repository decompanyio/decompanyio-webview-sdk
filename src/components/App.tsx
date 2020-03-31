import 'babel-polyfill'
import 'es6-promise/auto'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Route, Router, Switch } from 'react-router-dom'
import '../assets/styles/app.css'
import '../assets/styles/common.css'
import Header from './header/Header'
import routerList from '../util/routerList'
import history from '../util/history'
import { repos } from '../util/repos'
import LoadingModal from './common/modal/LoadingModal'
import { AUTH_APIS } from '../util/auth'
import UserInfo from '../service/model/UserInfo'
import InfoFromPo from '../service/model/InfoFromPo'
import Callback from './Callback'
import Login from './body/auth/Login'

export default function() {
  const [init, setInit] = useState(false)
  const [userInfo, setUserInfo] = useState(new UserInfo(null))
  const [poInfo, setPoInfo] = useState(new InfoFromPo(null))

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

  // PO 로부터 정보를 받아 온 뒤, poInfo Hooks state 에 저장 합니다.
  const setInfoFromPOToState = (): void => {
    // TODO 추후에 PO 로부터 받은 정보를 저장 해야 합니다.
    let infoFromPO = {}

    if (
      Object.keys(infoFromPO).length !== 0 &&
      JSON.stringify(infoFromPO) !== JSON.stringify({})
    ) {
      setPoInfo(poInfo)
    }
  }

  useEffect(() => {
    if (pathName() !== 'callback')
      repos
        .init()
        .then(() => setMyInfo())
        .then(() => {
          setInfoFromPOToState()
          setInit(true)
        })
  }, [])

  const getMainComponent = () => {
    if (pathName() === 'callback') return <Callback history={history} />
    if (!AUTH_APIS.isLogin()) {
      history.push('/')
      return <Login />
    }

    return (
      <div className="App">
        {init && <Header userInfo={userInfo} />}

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
                      <result.component
                        {...props}
                        userInfo={userInfo}
                        poInfo={poInfo}
                      />
                    )}
                  />
                )
              })}
            </Switch>
          </div>
        ) : (
          <LoadingModal />
        )}

        <ReactTooltip />
      </div>
    )
  }

  return <Router history={history}>{getMainComponent()}</Router>
}

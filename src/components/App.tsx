import React, { useEffect, useState } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import '../assets/styles/app.css'
import '../assets/styles/common.css'
import Header from './header/Header'
import routerList from '../util/routerList'
import history from '../util/history'
import { repos } from '../util/repos'
import LoadingModal from './common/modal/LoadingModal'

export default function() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    repos.init().then(() => setInit(true))
  }, [])

  const getMainComponent = () => {
    if (!init) return <LoadingModal />

    return (
      <div className="App">
        <Header />

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
                  render={(props: any) => <result.component {...props} />}
                />
              )
            })}
          </Switch>
        </div>
      </div>
    )
  }

  return <Router history={history}>{getMainComponent()}</Router>
}

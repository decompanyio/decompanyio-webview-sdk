import '@babel/polyfill'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'es6-promise/auto'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

declare global {
  interface Window {
    ourComponent: any
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App
      callMethods={(methods: any) => {
        window.ourComponent = methods
      }}
    />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

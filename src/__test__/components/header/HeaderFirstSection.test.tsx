import React from 'react'
import ReactDOM from 'react-dom'
import HeaderFirstSection from '../../../components/header/HeaderFirstSection'
import { BrowserRouter } from 'react-router-dom'

describe('HeaderFirstSection.tsx', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <HeaderFirstSection />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

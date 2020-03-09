import React from 'react'
import HeaderFirstSection from './HeaderFirstSection'
import HeaderSecondSection from './HeaderSecondSection'

export default function() {

  return (
    <header>
      <nav id="headerMainNav" className="h_fixed d-flex">
        <div className="h_container container d-flex">
          <HeaderFirstSection />
          <HeaderSecondSection />
        </div>
      </nav>
    </header>
  )
}

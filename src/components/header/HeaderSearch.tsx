import React, { useState } from 'react'
import SearchBtn from '../common/button/SearchBtn'

export default function() {
  const [showSearchBar, setShowSearchBar] = useState(-1)

  // 검색버튼 관리
  const handleSearchBtnClick = () => {
    let searchInputEle = document.getElementById(
      'headerSearchInput'
    ) as HTMLInputElement

    if (showSearchBar === 1) {
      searchInputEle.value = ''
    }

    setShowSearchBar(showSearchBar === 1 ? 0 : 1)
  }

  return (
    <div className="hs_searchContainer d-flex">
      <div
        className={
          'hs_searchInput d-flex pl-3 pr-3 ' +
          (showSearchBar === -1
            ? 'hs_searchInputNone'
            : showSearchBar === 1
            ? 'hs_searchInputOn'
            : 'hs_searchInputOff')
        }
        id="headerSearchBar"
      >
        <input type="text" id="headerSearchInput" />
      </div>
      <SearchBtn click={handleSearchBtnClick} />
    </div>
  )
}

import React, { useState } from 'react'
import SearchBtn from '../common/button/SearchBtn'
import history from '../../util/history'

export default function() {
  const [showSearchBar, setShowSearchBar] = useState(-1)

  // 검색버튼 관리
  const handleSearchBtnClick = () => {
    let searchInputEle = document.getElementById(
      'headerSearchInput'
    ) as HTMLInputElement

    if (showSearchBar === 1) {
      if (searchInputEle.value) {
        history.push({
          pathname: '/search',
          state: { searchValue: searchInputEle.value }
        })
      }

      searchInputEle.value = ''
    }

    setShowSearchBar(showSearchBar === 1 ? 0 : 1)
  }

  const handleKeyup = (e: any) => {
    if (e.keyCode === 13) {
      handleSearchBtnClick()
    }
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
        <input
          type="text"
          id="headerSearchInput"
          onKeyUp={e => handleKeyup(e)}
        />
      </div>
      <SearchBtn click={handleSearchBtnClick} />
    </div>
  )
}

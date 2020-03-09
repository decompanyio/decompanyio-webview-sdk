import React from 'react'

type Type = {
  click?: any
}

export default function({ click }: Type) {
  const handleSearchBtnClick = () => {
    click()
  }

  return (
    <div className="sb_wrapper ml-1 mr-2 d-flex">
      <div className="sb_searchBtn" onClick={() => handleSearchBtnClick()} />
    </div>
  )
}

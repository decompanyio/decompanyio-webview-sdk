import React from 'react'

interface SearchBtnProps {
  click?: any
}

export default function({ click }: SearchBtnProps) {
  const handleSearchBtnClick = () => {
    click()
  }

  return (
    <div className="sb_wrapper ml-1 d-flex">
      <div className="sb_searchBtn" onClick={() => handleSearchBtnClick()} />
    </div>
  )
}

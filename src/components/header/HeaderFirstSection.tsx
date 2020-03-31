import React from 'react'
import common from '../../util/common'
import { Link } from 'react-router-dom'

export default function() {
  let path = ''

  return (
    <div className="hfs_container d-flex col-5 col-sm-6 mt-1 pl-0">
      <Link to="/" onClick={() => common.scrollTop()} rel="nofollow">
        <div
          className={'hfs_logo' + (path || common.getIsMobile() ? 'Cut' : '')}
        />
      </Link>
    </div>
  )
}

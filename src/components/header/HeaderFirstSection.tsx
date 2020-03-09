import React, { useEffect } from 'react'
import common from '../../util/common'
import { Link } from 'react-router-dom'
import { Lang, psGetLang, psSetLang } from '../../util/localization'

export default function() {
  let path = ''
  let isMobile = false

  useEffect(() => {
    console.log(psGetLang())
  }, [])

  return (
    <div className="hfs_container d-flex col-5 mt-1 pl-0">
      <Link to="/" onClick={() => common.scrollTop()} rel="nofollow">
        <div className={'hfs_logo' + (path || isMobile ? 'Cut' : '')} />
      </Link>
      <div className="hfs_lang ml-3">
        <div
          className={psGetLang() === Lang.KR ? 'hfs_selected' : ''}
          onClick={() => (psGetLang() !== Lang.KR ? psSetLang(Lang.KR) : false)}
        >
          KR
        </div>
        <div
          className={psGetLang() === Lang.EN ? 'hfs_selected' : ''}
          onClick={() => (psGetLang() !== Lang.EN ? psSetLang(Lang.EN) : false)}
        >
          EN
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'
// @ts-ignore
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import ToolBtn from '../../common/button/ToolBtn'
import { psString } from '../../../util/localization'
import { APP_CONFIG } from '../../../util/app.config'

type Type = {
  documentData: any
}

// ellipsis 반응형 설정
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default function({ documentData }: Type) {
  const [imgUrl, setImgUrl] = useState('')

  // 썸네일 url 설정
  const setImg = () => {
    let _imgUrl: string
    try {
      _imgUrl = documentData.pagemap.matatags[0]['twitter:image']
    } catch (e) {
      _imgUrl = ''
    }
    setImgUrl(_imgUrl)
  }

  const handleDownloadClick = () => {
    // download
  }

  useEffect(() => {
    setImg()
  }, [])

  return (
    <div className="cli_container d-flex">
      <div className="cli_thumbnailContainer">
        <img
          src={imgUrl}
          alt={documentData.title}
          onError={e => {
            let element = e.target as HTMLImageElement
            element.src = APP_CONFIG.domain().static + '/image/logo-cut.png'
          }}
        />
      </div>
      <div className="cli_infoContainer">
        <div className="cli_title">
          <ResponsiveEllipsis
            text={
              documentData.title
                ? documentData.title
                : documentData.documentName
            }
            maxLine={8}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
        <div className="cli_descContainer">
          <ResponsiveEllipsis
            text={documentData.snippet}
            maxLine={2}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
        <ToolBtn
          name={psString('common-download')}
          click={handleDownloadClick()}
        />
      </div>
    </div>
  )
}

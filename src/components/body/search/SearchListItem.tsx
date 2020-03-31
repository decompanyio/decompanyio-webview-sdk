import React, { useEffect, useState } from 'react'
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'
// @ts-ignore
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import ToolBtn from '../../common/button/ToolBtn'
import { psString } from '../../../util/localization'
import { APP_CONFIG } from '../../../util/app.config'
import common from '../../../util/common'
import { repos } from '../../../util/repos'

interface SearchListItemProps {
  documentData: any
  idx: number
}

// ellipsis 반응형 설정
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default function({ documentData, idx }: SearchListItemProps) {
  const [imgUrl, setImgUrl] = useState('')
  const [isLandscape, setIsLandscape] = useState(false)

  const getThumbnailRatio = () => {
    if (!documentData.dimensions) {
      setIsLandscape(true)
    } else {
      const ele = document.getElementById(
        'sliThumbnailContainer_' + idx
      ) as HTMLElement

      let eleRatio = ele.offsetWidth / ele.offsetHeight
      let documentRatio =
        documentData.dimensions.width / documentData.dimensions.height

      setIsLandscape(eleRatio >= documentRatio)
    }
  }

  const handleDownloadClick = () =>
    repos.Document.getDocumentDownloadUrl({
      documentId: documentData.documentId
    })
      .then(result => {
        const a = document.createElement('a')

        a.style.display = 'none'
        document.body.appendChild(a)
        a.href = result.downloadUrl
        a.setAttribute('download', documentData.documentName)
        a.click()

        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      })
      .catch(err => console.error(err))

  useEffect(() => {
    let _imgUrl = documentData.pagemap.metatags[0]['twitter:image']
    setImgUrl(_imgUrl)
    getThumbnailRatio()
  }, [])

  return (
    <div className="sli_container d-flex">
      <div
        className="sli_thumbnailContainer"
        id={'sliThumbnailContainer_' + idx}
      >
        <p
          data-tip={
            "<img src='" +
            common.getThumbnail(
              documentData.documentId,
              640,
              1,
              documentData.documentName
            ) +
            "' alt='hoverThumbnail' >"
          }
          className={isLandscape ? 'sli_imgLandscape' : 'sli_thumbnail'}
          data-html={true}
          data-background-color="none"
          data-arrow-color="#4d4d4d00"
        >
          <img
            src={imgUrl}
            alt="thumbnail"
            onError={e => {
              let element = e.target as HTMLImageElement
              element.src = APP_CONFIG.domain().static + '/image/logo-cut.png'
            }}
          />
        </p>
      </div>
      <div className="sli_infoContainer">
        <div className="sli_title">
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
        <div className="sli_descContainer">
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

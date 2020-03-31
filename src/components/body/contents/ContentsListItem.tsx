import React, { ReactElement, useEffect, useState } from 'react'
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'
// @ts-ignore
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import common from '../../../util/common'
import Avatar from '../../common/avatar/Avatar'
import ToolBtn from '../../common/button/ToolBtn'
import { psString } from '../../../util/localization'
import ReactTooltip from 'react-tooltip'
import { repos } from '../../../util/repos'

interface ContentsListItemProps {
  documentData: any
  idx: number
}

// ellipsis 반응형 설정
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default function({
  documentData,
  idx
}: ContentsListItemProps): ReactElement {
  const [isLandscape, setIsLandscape] = useState(false)

  const getThumbnailRatio = () => {
    if (!documentData.dimensions) {
      setIsLandscape(true)
    } else {
      const ele = document.getElementById(
        'cliThumbnailContainer_' + idx
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
    getThumbnailRatio()
  }, [])

  return (
    <div className="cli_container d-flex" id={'cliTestDom'}>
      <div
        className="cli_thumbnailContainer"
        id={'cliThumbnailContainer_' + idx}
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
            "' alt='hover thumbnail' >"
          }
          className={isLandscape ? 'cli_imgLandscape' : 'cli_thumbnail'}
          data-html={true}
          data-background-color="none"
          data-arrow-color="#4d4d4d00"
        >
          <img
            src={common.getThumbnail(
              documentData.documentId,
              640,
              1,
              documentData.documentName
            )}
            alt="thumbnail"
          />
        </p>
      </div>
      <div className="cli_infoContainer">
        <div className="cli_title">
          <ResponsiveEllipsis
            text={
              documentData.title
                ? documentData.title
                : documentData.documentName
            }
            maxLine={2}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
        <div className="cli_authContainer d-flex">
          <Avatar
            size={25}
            croppedArea={documentData.author.croppedArea}
            picture={documentData.author.picture}
          />
          <div className="cli_authId">
            {documentData.author.username || documentData.author.email}
          </div>
        </div>
        <div className="cli_descContainer">
          <ResponsiveEllipsis
            text={documentData.desc}
            maxLine={2}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
        <ToolBtn
          name={psString('common-download')}
          click={handleDownloadClick}
        />
      </div>

      <ReactTooltip />
    </div>
  )
}

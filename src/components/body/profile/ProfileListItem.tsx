import React, { useEffect, useState } from 'react'
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'
// @ts-ignore
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
// @ts-ignore
import { FadingCircle } from 'better-react-spinkit'
import common from '../../../util/common'
import ReactTooltip from 'react-tooltip'
import ProfileItemOption from './ProfileItemOption'

interface ProfileListItemPrpos {
  documentData: any
  idx: number
  handleDeleteAfter: any
}

// ellipsis 반응형 설정
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default function({
  documentData,
  idx,
  handleDeleteAfter
}: ProfileListItemPrpos) {
  const [isLandscape, setIsLandscape] = useState(false)

  const getThumbnailRatio = () => {
    if (!documentData.dimensions) {
      setIsLandscape(true)
    } else {
      const ele = document.getElementById(
        'pliThumbnailContainer_' + idx
      ) as HTMLElement

      let eleRatio = ele.offsetWidth / ele.offsetHeight
      let documentRatio =
        documentData.dimensions.width / documentData.dimensions.height

      setIsLandscape(eleRatio >= documentRatio)
    }
  }

  useEffect(() => {
    getThumbnailRatio()
  }, [])

  return (
    <div className="pli_container d-flex">
      {documentData.state && documentData.state !== 'CONVERT_COMPLETE' ? (
        <div className="pli_thumbLoading">
          <div className="pli_notConvertContainer">
            <div className="pli_notConvert d-flex">
              <FadingCircle size={40} color="#3d5afe" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="pli_thumbnailContainer"
          id={'pliThumbnailContainer_' + idx}
        >
          <p
            data-tip={
              documentData.state === 'CONVERT_COMPLETE' &&
              "<img src='" +
                common.getThumbnail(
                  documentData.documentId,
                  640,
                  1,
                  documentData.documentName
                ) +
                "' alt='thumbnail'>"
            }
            className={isLandscape ? 'pli_imgLandscape' : 'pli_thumbnail'}
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
              alt={documentData.title}
            />
          </p>
        </div>
      )}
      <div className="pli_infoContainer">
        <ProfileItemOption
          idx={idx}
          documentData={documentData}
          handleDeleteAfter={handleDeleteAfter}
        />

        <div className="pli_title">
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
        <div className="pli_descContainer">
          <ResponsiveEllipsis
            text={documentData.desc}
            maxLine={2}
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </div>
      </div>

      <ReactTooltip />
    </div>
  )
}

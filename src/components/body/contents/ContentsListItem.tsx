import React from 'react'
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis'
// @ts-ignore
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import common from '../../../util/common'
import Avatar from '../../common/avatar/Avatar'
import ToolBtn from '../../common/button/ToolBtn'
import { psString } from '../../../util/localization'

type Type = {
  documentData: any
}

// ellipsis 반응형 설정
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default function({ documentData }: Type) {
  const handleDownloadClick = () => {
    // download
  }

  return (
    <div className="cli_container d-flex">
      <div className="cli_thumbnailContainer">
        <img
          src={common.getThumbnail(
            documentData.documentId,
            640,
            1,
            documentData.documentName
          )}
          alt={documentData.title}
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
          click={handleDownloadClick()}
        />
      </div>
    </div>
  )
}

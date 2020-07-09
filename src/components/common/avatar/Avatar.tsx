import React, { ReactElement, useEffect, useState } from 'react'
import common from '../../../util/common'
import { AUTH_APIS } from '../../../util/auth'

interface MyAvatarProps {
  croppedArea: any
  size: number
  picture: string
  click?: () => void
}

export default function({
  size,
  picture,
  croppedArea
}: MyAvatarProps): ReactElement {
  const [imgStyle, setImgStyle] = useState({
    width: '100%',
    height: 'auto',
    left: '0',
    top: '0'
  })

  let xLocation = 0
  let yLocation = 0
  let zoom = 1
  let wrapperStyle = {
    width: (size || 30) + 'px',
    height: (size || 30) + 'px'
  }

  useEffect(() => {
    common.getImgInfoOnPromise(picture).then(imgInfo => {
      if (croppedArea) {
        xLocation = Math.floor(
          (croppedArea.x || xLocation) /
            ((imgInfo ? croppedArea.height : croppedArea.width) / size)
        )
        yLocation = Math.floor(
          (croppedArea.y || yLocation) /
            ((imgInfo ? croppedArea.height : croppedArea.width) / size)
        )
        zoom = croppedArea.zoom || zoom
      }

      setImgStyle({
        width: !imgInfo ? 'auto' : Number(zoom * 100) + '%',
        height: imgInfo ? 'auto' : Number(zoom * 100) + '%',
        left: '-' + xLocation + 'px',
        top: '-' + yLocation + 'px'
      })
    })
  }, [])

  return (
    <div
      className="ma_container"
      style={wrapperStyle}
      onClick={() => AUTH_APIS.linkToMain()}
    >
      {picture.length > 0 ? (
        <img
          src={picture}
          alt="profile"
          className={'lazy '}
          style={imgStyle}
          onError={e => {
            let element = e.target as HTMLImageElement
            element.srcset = '/static/image/icon/i_profile-default.png'
          }}
        />
      ) : (
        <img
          src={'/static/image/icon/i_profile-default.png'}
          className={'ma_avatar ' + (size === 90 ? 'ma_avatar_big' : '')}
          alt="Link to my profile"
          onError={e => {
            let element = e.target as HTMLImageElement
            element.src = '/static/image/icon/i_profile-default.png'
          }}
        />
      )}
    </div>
  )
}

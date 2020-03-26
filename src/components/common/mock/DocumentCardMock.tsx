import React from 'react'

interface DocumentCardMockProps {
  order: number
}

export default function({ order }: DocumentCardMockProps) {
  return (
    <div
      className={
        'col-12 col-md-6 col-lg-4 mb-4 d-flex dcm_container dcm_containerOrder_' +
        order
      }
    >
      <div className="dcm_thumbnailContainer" />

      <div className="dcm_infoContainer">
        <div className="dcm_title mb-2 mock-gradient-animation" />
        <div className="dcm_infoContainer_1 mb-2 d-flex">
          <div className="dcm_imgThumbnailMock mock-gradient-animation" />
          <div className="dcm_nameMock mock-gradient-animation" />
        </div>

        <div className="dcm_descMock mock-gradient-animation mr-3" />

        <div className="dcm_downloadBtnMock mock-gradient-animation mr-3" />
      </div>
    </div>
  )
}

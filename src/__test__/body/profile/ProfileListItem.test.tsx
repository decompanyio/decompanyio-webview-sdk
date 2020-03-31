import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import DocumentInfo from '../../../service/model/DocumentInfo'
import common from '../../../util/common'
import ProfileListItem from '../../../components/body/profile/ProfileListItem'

let documentData = new DocumentInfo({
  author: {
    username: 'tester'
  },
  documentId: 'test1234',
  documentName: 'test'
})
let idx = 0

describe('<ProfileListItem />', () => {
  it('renders an image', () => {
    const { getByAltText } = render(
      <ProfileListItem documentData={documentData} idx={idx} />
    )

    const image = getByAltText('thumbnail')

    expect(image).toHaveAttribute(
      'src',
      common.getThumbnail(
        documentData.documentId,
        640,
        1,
        documentData.documentName
      )
    )
  })
})

import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ContentsListItem from '../../../components/body/contents/ContentsListItem'
import DocumentInfo from '../../../service/model/DocumentInfo'
import common from '../../../util/common'

let documentData = new DocumentInfo({
  author: {
    username: 'tester'
  },
  documentId: 'test1234',
  documentName: 'test'
})
let idx = 0

describe('<ContentsListItem />', () => {
  it('shows the props correctly', () => {
    const tree = render(
      <ContentsListItem documentData={documentData} idx={idx} />
    )
    tree.getByText('tester')
  })

  it('renders an image', () => {
    const { getByAltText } = render(
      <ContentsListItem documentData={documentData} idx={idx} />
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

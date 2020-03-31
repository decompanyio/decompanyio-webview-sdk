import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import SearchListItem from '../../../components/body/search/SearchListItem'

let documentData = {
  author: {
    username: 'tester'
  },
  documentId: 'test1234',
  documentName: 'test',
  pagemap: {
    metatags: [{ 'twitter:image': 'test' }]
  },
  dimensions: {
    width: 100,
    height: 100
  }
}
let idx = 0

describe('<SearchListItem />', () => {
  it('renders an image', () => {
    const { getByAltText } = render(
      <SearchListItem documentData={documentData} idx={idx} />
    )

    const image = getByAltText('thumbnail')

    expect(image).toHaveAttribute('src', 'test')
  })
})

import ContentsListItem from '../../../../components/body/contents/ContentsListItem'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import DocumentInfo from '../../../../service/model/DocumentInfo'

describe('ContentsListItem.tsx', () => {
  beforeAll(() => {
    // Avoid `attachTo: document.body` Warning
    const div = document.createElement('div')
    div.setAttribute('id', 'container')
    document.body.appendChild(div)
  })

  it('renders without crashing', () => {
    let component = TestUtils.renderIntoDocument(
      <ContentsListItem documentData={new DocumentInfo(null)} idx={0} />
    )

    expect(
      // @ts-ignore
      TestUtils.scryRenderedDOMComponentsWithTag(component, 'div').length
    ).toBe(7)

    console.log(
      '찾은 div 수:',
      // @ts-ignore
      TestUtils.scryRenderedDOMComponentsWithTag(component, 'div').length
    )
  })
})

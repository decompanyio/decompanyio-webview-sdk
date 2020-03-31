import ContentsCategoryName from '../../../components/body/contents/ContentsCategoryName'
import React from 'react'
import { render } from '@testing-library/react'

let category = 'test'
let subCategory = 'testSub'

describe('<ContentsCategoryName />', () => {
  it('shows the props correctly', () => {
    const tree = render(
      <ContentsCategoryName category={category} subCategory={subCategory} />
    )
    tree.getByText('test')
    tree.getByText('testSub')
  })
})

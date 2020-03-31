import { render } from '@testing-library/react'
import React from 'react'
import ToolBtn from '../../../components/common/button/ToolBtn'

let name = 'test'

describe('<AuthBtn />', () => {
  it('shows the props correctly', () => {
    const tree = render(<ToolBtn name={name} />)
    tree.getByText('test')
  })
})

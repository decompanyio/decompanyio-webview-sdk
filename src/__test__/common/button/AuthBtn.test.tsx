import AuthBtn from '../../../components/common/button/AuthBtn'
import { render } from '@testing-library/react'
import React from 'react'

let provider = 'google'

describe('<AuthBtn />', () => {
  it('shows the props correctly', () => {
    const tree = render(<AuthBtn provider={provider} />)
    tree.getByText('Log in with google')
  })
})

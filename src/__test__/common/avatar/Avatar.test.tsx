import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Avatar from '../../../components/common/avatar/Avatar'

let size = 30
let picture = 'test'
const croppedArea = {
  width: 823,
  height: 823,
  x: 0,
  y: 0
}

describe('<Avatar />', () => {
  it('renders an image', () => {
    const { getByAltText } = render(
      <Avatar size={size} picture={picture} croppedArea={croppedArea} />
    )

    const image = getByAltText('profile')

    expect(image).toHaveAttribute('src', picture)
  })
})

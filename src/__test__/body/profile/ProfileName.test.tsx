import React from 'react'
import { render } from '@testing-library/react'
import ProfileName from '../../../components/body/profile/ProfileName'
import UserInfo from '../../../service/model/UserInfo'

let category = 'profile'
let userInfo = new UserInfo({
  email: 'test@test.com'
})

describe('<ContentsCategoryName />', () => {
  it('shows the props correctly', () => {
    const tree = render(
      <ProfileName category={category} userInfo={userInfo} />
    )
    tree.getByText('test@test.com profile')
  })
})

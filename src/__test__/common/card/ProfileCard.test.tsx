import React from 'react'
import { render } from '@testing-library/react'
import ProfileCard from '../../../components/common/card/ProfileCard'
import UserInfo from '../../../service/model/UserInfo'
import { BrowserRouter } from 'react-router-dom'
import { psString } from '../../../util/localization'

let testerInfo = new UserInfo({ email: 'test@test.com' })

describe('<ProfileCard />', () => {
  test('shows the props correctly', () => {
    const utils = render(
      <BrowserRouter>
        <ProfileCard userInfo={testerInfo} />
      </BrowserRouter>
    )
    utils.getByText('test@test.com')
    utils.getByText(psString('profile-card-my-page'))
    utils.getByText(psString('common-logout'))
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { psString } from '../../../util/localization'
import LimitPrivateDocumentModal from '../../../components/common/modal/LimitPrivateDocumentModal'

let privateDocumentCount = 10

describe('<LimitPrivateDocumentModal />', () => {
  it('shows the props correctly', () => {
    const tree = render(
      <LimitPrivateDocumentModal privateDocumentCount={privateDocumentCount} />
    )
    tree.getByText(psString('upload-limit-private-doc-subj'))
  })
})

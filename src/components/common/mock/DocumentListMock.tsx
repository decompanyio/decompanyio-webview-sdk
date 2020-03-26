import DocumentCardMock from './DocumentCardMock'
import React from 'react'

export default function() {
  return (
    <div className="dlm_documentCardMockWrapper mt-3 row">
      <DocumentCardMock order={1} />
      <DocumentCardMock order={2} />
      <DocumentCardMock order={3} />
      <DocumentCardMock order={4} />
    </div>
  )
}

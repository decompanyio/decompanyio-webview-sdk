import React from 'react'

type Type = {
  category: string
}

export default function({ category }: Type) {
  return <div className="ccn_container">{category}</div>
}

import React from 'react'

type Type = {
  category: string
  subCategory?: string
}

export default function({ category, subCategory }: Type) {
  return (
    <div className="ccn_container">
      {category}
      <span>{subCategory}</span>
    </div>
  )
}

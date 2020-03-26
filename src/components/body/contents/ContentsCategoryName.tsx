import React from 'react'

interface ContentsCategoryNameProps {
  category: string
  subCategory?: string
}

export default function({ category, subCategory }: ContentsCategoryNameProps) {
  return (
    <div className="ccn_container">
      {category}
      <span>{subCategory}</span>
    </div>
  )
}

import React from 'react'

type Type = {
  name: string
  click?: any
}

export default function({ name, click }: Type) {
  const handleClick = () => click

  return (
    <div onClick={handleClick()} className="tb_container">
      {name}
    </div>
  )
}

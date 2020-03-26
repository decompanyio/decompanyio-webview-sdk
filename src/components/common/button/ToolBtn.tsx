import React from 'react'

interface ToolBtnProps {
  name: string
  click?: any
}

export default function({ name, click }: ToolBtnProps) {
  const handleClick = () => click()

  return (
    <div onClick={() => handleClick()} className="tb_container">
      {name}
    </div>
  )
}

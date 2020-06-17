import React, { CSSProperties } from 'react'
import classNames from 'classnames'

export interface IMenuItemProps {
  index?: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, children, style, className } = props
  const classes = classNames('stars-menu-item', className, {
    'is-disabled': disabled
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem

import React from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'

export interface IMenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: (selectIndex: number) => void
}

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, style, className, mode, children } = props

  const classes = classNames('stars-menu', className, {
    'stars-menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu

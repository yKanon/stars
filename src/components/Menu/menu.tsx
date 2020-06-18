import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void
export interface IMenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, style, className, mode, children, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('stars-menu', className, {
    'stars-menu-vertical': mode === 'vertical'
  })

  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive ?? 0,
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu

import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { IMenuItemProps } from './menuItem'

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
  mode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, style, className, mode, children, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('stars-menu', className, {
    'stars-menu-vertical': mode === 'vertical',
    'stars-menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >
      const { displayName } = childElement.type

      // eslint-disable-next-line
      return displayName === 'MenuItem' || displayName === 'SubMenu'
        ? React.cloneElement(childElement, { index })
        : console.error(
            `Warning: Menu has a child which is not a MenuItem component`
          )
    })
  }

  const passedContext: IMenuContext = {
    index: currentActive ?? 0,
    onSelect: handleClick,
    mode
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu

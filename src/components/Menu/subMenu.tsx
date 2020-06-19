import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { IMenuItemProps } from './menuItem'

export interface ISubMenuProps {
  index?: number
  title: string
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = ({
  index,
  title,
  children,
  className
}) => {
  const context = useContext(MenuContext)
  const classes = classNames(
    'stars-menu-item stars-menu-item-submenu',
    className,
    {
      'is-active': context.index === index
    }
  )

  const renderChildren = () => {
    const childrenComponents = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >
      const { displayName } = childElement.type

      // eslint-disable-next-line
      return displayName === 'MenuItem'
        ? React.cloneElement(childElement, { index })
        : console.error(
            `Warning: Menu has a child which is not a MenuItem component`
          )
    })

    return <ul className="stars-submenu">{childrenComponents}</ul>
  }

  return (
    <li className={classes} key={index}>
      <div className="stars-submenu-title">{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = `SubMenu`

export default SubMenu

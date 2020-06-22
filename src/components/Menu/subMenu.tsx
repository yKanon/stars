import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { IMenuItemProps } from './menuItem'

export interface ISubMenuProps {
  index?: string
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
  const openedSubMenus = context.defaultOpenSubMenus as string[]
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false

  const [subMenuIsOpen, setSebMenuIsOpen] = useState(isOpened)
  const classes = classNames(
    'stars-menu-item stars-menu-item-submenu',
    className,
    {
      'is-active': context.index === index
    }
  )

  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setSebMenuIsOpen(toggle)
    }, 300)
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSebMenuIsOpen(!subMenuIsOpen)
  }

  const clickEvent = context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          }
        }
      : {}

  const renderChildren = () => {
    const subClasses = classNames('stars-submenu', {
      'stars-submenu-open': subMenuIsOpen
    })
    const childrenComponents = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        IMenuItemProps
      >
      const { displayName } = childElement.type

      // eslint-disable-next-line
      return displayName === 'MenuItem'
        ? React.cloneElement(childElement, { index: `${index}-${i}` })
        : console.error(
            `Warning: Menu has a child which is not a MenuItem component`
          )
    })

    return <ul className={subClasses}>{childrenComponents}</ul>
  }

  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div className="stars-submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = `SubMenu`

export default SubMenu

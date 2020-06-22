import React from 'react'
import {
  render,
  wait,
  fireEvent,
  RenderResult,
  getByTestId,
  cleanup
} from '@testing-library/react'
import Menu, { IMenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

// const testFn = () => {
//   console.log(`1`)
// }

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu: React.FC<IMenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>3-1</MenuItem>
        <MenuItem>3-2</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .stars-submenu {
      display: none
    }
    .stars-submenu.stars-submenu-open {
      display: block
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps) as React.ReactElement)
    wrapper.container.append(createStyleFile())

    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('stars-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('stars-menu-item is-active')
    expect(disabledElement).toHaveClass('stars-menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText(`xyz`)
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledTimes(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(
      generateMenu(testVerticalProps) as React.ReactElement
    )
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('stars-menu-vertical')
  })

  it('should show dropdown items when hover on submenu', async () => {
    expect(wrapper.queryByText('3-1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // 在 submenu 中设置了雅安吃300ms显示。因此此处需要用异步等待
    await wait(() => {
      expect(wrapper.queryByText('3-1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('3-1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(wrapper.queryByText('3-1')).not.toBeVisible()
    })
  })
})

describe('test Menu and MenuItem components in vertical mode', () => {
  beforeEach(() => {
    const wrapper = render(
      generateMenu(testVerticalProps) as React.ReactElement
    )
    wrapper.container.append(createStyleFile())

    it('should render vertical mode is set to vertical', () => {
      const menuElement = wrapper.getByTestId('test-menu')
      expect(menuElement).toHaveClass('stars-menu-vertical')
    })

    it('should show dropdown items when click on subMenu for vertical mode', () => {
      const dropdownItem = wrapper.queryByText('3-1')
      expect(dropdownItem).not.toBeVisible()
      fireEvent.click(wrapper.getByText('dropdown'))
      expect(dropdownItem).toBeVisible()
    })

    it('should show subMenu dropdown when defaultOpenSubmenus contains SubMenu index', () => {
      expect(wrapper.queryByText('3-1')).toBeVisible()
    })
  })
})

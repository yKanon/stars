import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  getByTestId,
  cleanup
} from '@testing-library/react'
import Menu, { IMenuProps } from './menu'
import MenuItem from './menuItem'

// const testFn = () => {
//   console.log(`1`)
// }

const testProps: IMenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerticalProps: IMenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu: React.FC<IMenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps) as React.ReactElement)
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('stars-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('stars-menu-item is-active')
    expect(disabledElement).toHaveClass('stars-menu-item is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText(`xyz`)
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
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
})

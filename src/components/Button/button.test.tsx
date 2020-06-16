import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

describe('test button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>按钮</Button>)
    const element = wrapper.queryByText('按钮')
    expect(element).toBeInTheDocument()
    expect(element?.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on different props', () => {})
  it('should render a link when btnType equals link and href is provided', () => {})
  it('should render disabled button when attribute "disabled" is setted true', () => {})
})
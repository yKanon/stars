import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'small'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface IBaseButtonProps {
  disabled?: boolean
  className?: string
  size?: ButtonSize
  btnType?: ButtonType
  href?: string
  children: React.ReactNode
}

const Button: React.FC<IBaseButtonProps> = (props) => {
  const { disabled, className, size, btnType, href, children } = props

  // btn, btn-lg, btn-danger
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
  // className: string
  // size: ButtonSize
  // href: string
  // children: React.ReactNode
}

export default Button

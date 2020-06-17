import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
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

type NativeButtonProps = IBaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IBaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    className,
    size,
    btnType,
    href,
    children,
    ...restProps
  } = props

  // btn, btn-lg, btn-danger
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      // eslint-disable-next-line
      <a className={classes} href={disabled ? undefined : href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
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

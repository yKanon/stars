import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface IBaseButtonProps {
  /** 设置 Button 的禁用 */
  disabled?: boolean;
  className?: string;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 第一个 Button 组件
 * ## Button Header
 * ~~~js
 *  Hello World
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    className,
    size,
    btnType,
    href,
    children,
    ...restProps
  } = props;

  // btn, btn-lg, btn-danger
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      // eslint-disable-next-line
      <a className={classes} href={disabled ? undefined : href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;

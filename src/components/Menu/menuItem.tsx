import React, { useContext, CSSProperties, FC } from "react";
import classNames from "classnames";

import { MenuContext } from "./menu";
export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const MenuItem: FC<IMenuItemProps> = (props) => {
  const { index, disabled, children, style, className } = props;
  const context = useContext(MenuContext);
  const classes = classNames("stars-menu-item", className, {
    "is-disabled": disabled,
    "is-active": index === context.index,
  });

  const handleClick = () => {
    context.onSelect &&
      !disabled &&
      typeof index === `string` &&
      context.onSelect(index);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;

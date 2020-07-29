import React, {
  useState,
  createContext,
  FC,
  FunctionComponentElement,
  CSSProperties,
} from "react";
import classNames from "classnames";
import { IMenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: string) => void;
export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<IMenuProps> = (props) => {
  const {
    defaultIndex,
    style,
    className,
    mode,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("stars-menu", className, {
    "stars-menu-vertical": mode === "vertical",
    "stars-menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>;
      const { displayName } = childElement.type;

      // eslint-disable-next-line
      return displayName === "MenuItem" || displayName === "SubMenu"
        ? React.cloneElement(childElement, { index: index.toString() })
        : console.error(
            `Warning: Menu has a child which is not a MenuItem component`
          );
    });
  };

  const passedContext: IMenuContext = {
    index: currentActive ?? "0",
    onSelect: handleClick,
    defaultOpenSubMenus,
    mode,
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;

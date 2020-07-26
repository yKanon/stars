import React from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/icon/icon";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <div className="App">
      <Menu
        defaultIndex="0"
        onSelect={(index) => {
          alert(index);
        }}
      >
        <MenuItem>cool link 1</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>

      <Menu
        mode="vertical"
        defaultIndex="0"
        defaultOpenSubMenus={["2"]}
        onSelect={(index) => {
          alert(index);
        }}
      >
        <MenuItem index="0">cool link 1</MenuItem>
        <MenuItem index="1" disabled>
          cool link 2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;

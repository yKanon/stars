import React, { useState } from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Transition from "./components/Transition/transition";
import Button from "./components/Button/button";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: React.FC = (props) => {
  const [show, setShow] = useState(false);

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

      <Button
        size="lg"
        onClick={() => {
          setShow(!show);
        }}
      >
        Toggle
      </Button>

      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </Transition>

      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <Button btnType="primary" size="lg">
          A Large Button
        </Button>
      </Transition>
    </div>
  );
};

export default App;

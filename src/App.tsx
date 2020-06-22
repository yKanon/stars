import React from 'react'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <Menu
        defaultIndex="0"
        onSelect={(index) => {
          alert(index)
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
        defaultOpenSubMenus={['2']}
        onSelect={(index) => {
          alert(index)
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

      <code>hello world</code>
      <a href="http://www.baidu.com">百度</a>
    </div>
  )
}

export default App

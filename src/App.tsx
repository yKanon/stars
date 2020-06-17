import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <Menu
        defaultIndex={1}
        onSelect={(index) => {
          alert(index)
        }}
      >
        <MenuItem index={1}>cool link 1</MenuItem>
        <MenuItem index={2} disabled>
          cool link 2
        </MenuItem>
        <MenuItem index={3}>cool link 3</MenuItem>
      </Menu>
      <header className="App-header">
        <Button disabled>这是一个按钮</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          这是一个大按钮
        </Button>
        <Button onClick={() => console.log(1)}>这是一个按钮</Button>
        <Button
          className="custom"
          btnType={ButtonType.Primary}
          size={ButtonSize.Small}
        >
          这是一个小按钮
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          百度Link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          onClick={(e) => console.log(e)}
          disabled
        >
          百度
        </Button>
        {/* <Button
          onClick={() => console.log(`link`)}
          btnType={ButtonType.Link}
          // eslint-disable-next-line
          href="javascript: void(0);"
        >
          百度Link
        </Button> */}
        <Button btnType={ButtonType.Danger}>这是一个按钮</Button>
      </header>

      <code>hello world</code>
      <a href="http://www.baidu.com">百度</a>
    </div>
  )
}

export default App

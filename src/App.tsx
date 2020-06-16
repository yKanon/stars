import React from 'react'
import logo from './logo.svg'
import './App.css'

import Button, { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>这是一个按钮</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          这是一个按钮
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">
          这是一个按钮
        </Button>
      </header>
    </div>
  )
}

export default App

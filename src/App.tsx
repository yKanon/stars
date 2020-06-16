import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>这是一个按钮</Button>
        <Button disabled>这是一个按钮</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          这是一个按钮
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">
          百度Link
        </Button>
      </header>

      <code>hello world</code>
      <a href="http://www.baidu.com">百度</a>
    </div>
  )
}

export default App

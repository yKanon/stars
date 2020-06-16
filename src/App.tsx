import React from 'react'
import logo from './logo.svg'
import './App.css'

import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>这是一个按钮</Button>
      </header>
    </div>
  )
}

export default App

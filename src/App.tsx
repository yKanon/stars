import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    // axios.get().then(() => {});
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
      </header>
    </div>
  );
};

export default App;

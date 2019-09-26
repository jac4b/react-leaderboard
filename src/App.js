import React from 'react';
import logo from './pga_header_logo.png';
import './App.css';
import Leaderboard from './components/Leaderboard/Leaderboard.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;

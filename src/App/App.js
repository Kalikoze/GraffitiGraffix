import React, { Component } from 'react';
import Main from '../Pages/Main/Main/Main';
import './App.css';
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Main} />
      </div>
    );
  }
}

export default App;

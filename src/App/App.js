import React, { Component } from 'react';
import Main from '../Pages/Main/Main/Main';
import './App.css';
import { Route } from 'react-router-dom'
import Artists from '../Pages/Artists/Artists/Artists';
import Navigation from '../Pages/Main/Navigation/Navigation'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path='/' component={Main} />
        <Route exact path='/artists' component={Artists} />
      </div>
    );
  }
}

export default App;

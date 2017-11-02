import React, { Component } from 'react';
import Main from '../Pages/Main/Main/Main';
import './App.css';
import { Route } from 'react-router-dom';
import Artists from '../Pages/Artists/Artists/Artists';
import Navigation from '../Pages/Main/Navigation/Navigation';
import SignUp from '../Pages/SignUp/SignUp';
import Profile from '../Pages/Artists/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Main} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile}/>
      </div>
    );
  }
}

export default App;
